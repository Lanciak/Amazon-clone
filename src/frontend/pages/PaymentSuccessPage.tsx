
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '../contexts/CartContext';

const PaymentSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  
  // Make sure cart is cleared on success page view
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card className="border-green-100 shadow-lg">
        <CardHeader className="border-b bg-green-50 flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-600 mb-2" />
          <CardTitle className="text-2xl font-bold text-center">Payment Successful!</CardTitle>
          <CardDescription className="text-center">
            Your order has been confirmed and will be shipped soon.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Order number:</span>
              <span># {Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Order date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p>
              You will receive an email confirmation shortly at your registered email address.
            </p>
            
            <p>
              If you have any questions about your order, please contact our customer service.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4 border-t pt-6">
          <Button asChild>
            <Link to="/home">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
