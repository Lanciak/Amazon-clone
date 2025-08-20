
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';
import paymentService from '../services/paymentService';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
  const { subtotal, cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  // Effect to create a payment intent when the component mounts
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (subtotal > 0) {
          // Convert to cents for Stripe
          const amount = Math.round(subtotal * 100);
          const { clientSecret: secret } = await paymentService.createPaymentIntent(amount);
          setClientSecret(secret);
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error);
        setPaymentError(error instanceof Error ? error.message : 'An unknown error occurred');
        toast({
          title: "Payment Setup Error",
          description: "Unable to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchPaymentIntent();
  }, [subtotal, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Use the CardElement to create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!paymentMethod) {
        throw new Error('Payment method creation failed');
      }

      // Process payment with our payment service
      const result = await paymentService.processPayment(paymentMethod.id, Math.round(subtotal * 100));
      
      if (result.success) {
        toast({
          title: "Payment Successful!",
          description: `Your payment of $${subtotal.toFixed(2)} was processed successfully.`,
        });
        
        // Clear the cart after successful payment
        clearCart();
        
        // Call the success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setPaymentError(errorMessage);
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-gray-200 p-4 bg-white">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Card Details</h3>
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        </div>
        
        {paymentError && (
          <div className="text-red-500 text-sm mt-2">{paymentError}</div>
        )}
        
        <div className="mt-4 flex gap-3">
          <Button 
            type="submit" 
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] border border-[#FCD200]" 
            disabled={isProcessing || !stripe || !elements || subtotal === 0}
          >
            {isProcessing ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel} 
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Order Summary</h4>
        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items):</span>
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
    </form>
  );
};

export default CheckoutForm;
