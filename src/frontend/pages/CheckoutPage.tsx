
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import StripeWrapper from '../components/StripeWrapper';
import CheckoutForm from '../components/CheckoutForm';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

const CheckoutPage = () => {
  const { cart, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if cart is valid for checkout
  useEffect(() => {
    const validateCart = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, you might want to validate the cart items
        // E.g., check if products are still available, prices are current, etc.
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (cart.length === 0) {
          setError('Your cart is empty. Please add items before checkout.');
        }
      } catch (err) {
        console.error('Error validating cart:', err);
        setError('Unable to process your cart. Please try again.');
        toast({
          title: "Checkout Error",
          description: "There was a problem loading your checkout. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    validateCart();
  }, [cart, toast]);

  // Handle successful payment
  const handlePaymentSuccess = () => {
    toast({
      title: "Order Complete!",
      description: "Thank you for your purchase. Your order has been received.",
    });
    navigate('/payment-success');
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    navigate('/cart');
  };

  // If cart is empty, redirect to cart page
  if (!isLoading && cart.length === 0) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ) : error ? (
          <div className="bg-white p-6 rounded shadow">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => navigate('/cart')} 
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Return to Cart
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                {/* In a real app, you would have a form for shipping address */}
                <p className="text-gray-500">Please enter your shipping information in a real checkout.</p>
              </div>
              
              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <StripeWrapper>
                  <CheckoutForm 
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                  />
                </StripeWrapper>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded shadow sticky top-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Shipping:</span>
                    <span>${subtotal > 35 ? '0.00' : '5.99'}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Estimated tax:</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t font-medium">
                    <span>Order total:</span>
                    <span>${(subtotal + (subtotal > 35 ? 0 : 5.99) + subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
