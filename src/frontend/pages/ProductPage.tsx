import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { getProductById } from "../data/products";
import { useCart } from "../contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [expandedDescription, setExpandedDescription] = useState(false);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    } else if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <Link 
          to="/home" 
          className="text-[#007185] hover:text-[#C7511F] hover:underline"
        >
          Return to homepage
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = deliveryDate.toLocaleDateString('en-US', options);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-500 mb-4">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link to="/home" className="hover:text-[#C7511F] hover:underline">Home</Link>
              <span className="mx-2">&gt;</span>
            </li>
            <li className="flex items-center">
              <Link to={`/category/${product.category}`} className="hover:text-[#C7511F] hover:underline">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <span className="mx-2">&gt;</span>
            </li>
            <li className="text-gray-700 truncate max-w-xs">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 mb-6 md:mb-0">
            <div className="sticky top-0 flex flex-col md:flex-row">
              {product.images && product.images.length > 1 && (
                <div className="hidden md:flex flex-col space-y-2 mr-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`border rounded-md p-1 w-16 h-16 cursor-pointer ${
                        activeImage === image ? "border-[#FF9900]" : "border-gray-300"
                      }`}
                      onClick={() => setActiveImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - view ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex-1 flex items-center justify-center bg-white border-b md:border-b-0">
                <img
                  src={activeImage || product.image}
                  alt={product.title}
                  className="max-h-96 object-contain"
                />
              </div>

              {product.images && product.images.length > 1 && (
                <div className="flex md:hidden justify-center space-x-2 mt-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`border rounded-full w-2 h-2 ${
                        activeImage === image ? "bg-[#FF9900]" : "bg-gray-300"
                      }`}
                      onClick={() => setActiveImage(image)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-3/5 md:pl-8">
            <h1 className="text-xl md:text-2xl font-medium mb-1">{product.title}</h1>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-[#FFA41C] fill-[#FFA41C]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <a href="#reviews" className="text-sm text-[#007185] ml-2 hover:text-[#C7511F] hover:underline">
                {product.ratingCount.toLocaleString()} ratings
              </a>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-sm">R</span>
                <span className="text-3xl font-medium">{parseInt(product.price.toString())}</span>
                <span className="text-sm">
                  {(product.price % 1).toFixed(2).substring(1)}
                </span>
              </div>
              
              {product.originalPrice && (
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 line-through mr-2">
                    R {product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[#CC0C39]">
                    Save R {(product.originalPrice - product.price).toFixed(2)} (
                    {Math.round((1 - product.price / product.originalPrice) * 100)}%)
                  </span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className={`text-sm ${expandedDescription ? "" : "line-clamp-3"}`}>
                {product.description}
              </div>
              {product.description && product.description.length > 200 && (
                <button
                  onClick={() => setExpandedDescription(!expandedDescription)}
                  className="text-sm text-[#007185] flex items-center mt-1 hover:text-[#C7511F] hover:underline"
                >
                  {expandedDescription ? (
                    <>
                      <ChevronUp size={14} className="mr-1" /> Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} className="mr-1" /> Show more
                    </>
                  )}
                </button>
              )}
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">About this item</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:absolute md:top-32 md:right-8 md:w-64">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="text-xl font-medium mb-1">R {product.price.toFixed(2)}</div>
            
            {product.originalPrice && (
              <div className="text-sm mb-2">
                <span className="text-gray-500 line-through mr-1">
                  R {product.originalPrice.toFixed(2)}
                </span>
                <span className="text-[#CC0C39]">
                  ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                </span>
              </div>
            )}

            <div className="text-sm mb-4">
              <div className="font-medium text-[#007600]">
                {product.stockCount && product.stockCount > 0 ? "In Stock" : "Out of Stock"}
              </div>
              {product.isPrime && (
                <div className="mt-1">
                  <span className="text-[#007185] font-bold">Prime</span> FREE Delivery{" "}
                  <span className="font-bold">{formattedDate}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm mb-1">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md p-1 text-sm w-16"
              >
                {[...Array(Math.min(10, product.stockCount || 10))].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-3 rounded-full border border-[#FCD200] shadow-sm"
              >
                Add to Cart
              </button>
              <button className="w-full bg-[#FFA41C] hover:bg-[#FF8F00] text-[#0F1111] py-1 px-3 rounded-full border border-[#FF8F00] shadow-sm">
                Buy Now
              </button>
            </div>
            
            <div className="text-xs text-gray-600 mt-2">
              <span className="block">Ships from and sold by Amazon.com</span>
              <span className="block mt-1">Return policy: Eligible for Return, Refund or Replacement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
