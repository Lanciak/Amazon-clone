
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow p-4 h-full flex flex-col">
        <div className="relative pb-4 flex-grow flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-40 object-contain"
          />
        </div>
        
        <h3 className="font-medium text-sm line-clamp-2 mb-1 h-10">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? "text-[#FFA41C] fill-[#FFA41C]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">
            ({product.ratingCount})
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline">
            <span className="text-lg font-bold">R {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-2">
                R {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.isPrime && (
            <p className="text-xs text-[#007185] mt-1">
              <span className="font-bold">Prime</span> FREE Delivery
            </p>
          )}
          
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-sm py-1 px-3 rounded-full border border-[#FCD200] shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
