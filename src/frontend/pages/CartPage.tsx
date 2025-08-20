import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { user } = useAuth();
  const [saveLaterIds, setSaveLaterIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Shipping cost calculation
  const shippingCost = subtotal > 35 ? 0 : 5.99;
  
  // Estimated tax (roughly 8%)
  const estimatedTax = subtotal * 0.08;
  
  // Order total
  const orderTotal = subtotal + shippingCost + estimatedTax;

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleDeleteItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleSaveForLater = (productId: string) => {
    setSaveLaterIds((prev) => [...prev, productId]);
    removeFromCart(productId);
  };
  
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0 && saveLaterIds.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-medium mb-4">Your Amazon Cart is empty</h1>
            <p className="mb-6">
              Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing,
              household supplies, electronics, and more.
            </p>
            <Link
              to="/home"
              className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-4 rounded-md"
            >
              Continue shopping
            </Link>
            {!user && (
              <div className="mt-8 border-t pt-6 max-w-md mx-auto">
                <p className="mb-4">Sign in to see your saved items</p>
                <Link
                  to="/login"
                  className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-4 rounded-md"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Cart Section */}
          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-2xl font-medium">Shopping Cart</h1>
              <span className="text-sm text-gray-500">Price</span>
            </div>

            {/* Cart Items */}
            {cart.length > 0 ? (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row py-4 border-b last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                      <Link to={`/product/${item.id}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow px-4">
                      <Link to={`/product/${item.id}`}>
                        <h2 className="text-base font-medium hover:text-[#C7511F]">
                          {item.title}
                        </h2>
                      </Link>
                      
                      {item.stockCount && item.stockCount > 0 ? (
                        <p className="text-sm text-[#007600] mt-1">In Stock</p>
                      ) : (
                        <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                      )}

                      {item.isPrime && (
                        <p className="text-xs mt-1">
                          <span className="text-[#007185] font-bold">Prime</span> FREE Delivery
                        </p>
                      )}

                      {/* Quantity and Actions */}
                      <div className="flex items-center mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value))
                          }
                          className="border border-gray-300 rounded-md p-1 text-sm mr-4"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline mr-3"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleSaveForLater(item.id)}
                          className="text-[#007185] text-sm hover:text-[#C7511F] hover:underline"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right font-medium mt-2 sm:mt-0">
                      R {item.price.toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Subtotal */}
                <div className="text-right text-lg mt-4">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): <span className="font-bold">R {subtotal.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No items in your cart</p>
                <Link
                  to="/home"
                  className="text-[#007185] hover:text-[#C7511F] hover:underline inline-block mt-2"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </div>

          {/* Checkout Card */}
          {cart.length > 0 && (
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-base mb-4">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                  <span className="font-bold">R {subtotal.toFixed(2)}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? "FREE" : `R ${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated tax:</span>
                    <span>R {estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t my-2 pt-2 flex justify-between font-medium">
                    <span>Order total:</span>
                    <span>R {orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-3 rounded-md border border-[#FCD200] shadow-sm mb-2"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Saved for Later Section */}
        {saveLaterIds.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium border-b pb-4 mb-4">Saved for later</h2>
            <p className="text-gray-500">Items moved to saved for later will appear here</p>
          </div>
        )}

        {/* Recommended Products */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium mb-4">Recommended based on your shopping trends</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {/* Recommendation placeholders */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border rounded-md p-4">
                <div className="w-full h-32 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
