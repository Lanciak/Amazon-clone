
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from "./frontend/pages/HomePage";
import ProductPage from "./frontend/pages/ProductPage";
import CartPage from "./frontend/pages/CartPage";
import LoginPage from "./frontend/pages/LoginPage";
import RegisterPage from "./frontend/pages/RegisterPage";
import CheckoutPage from "./frontend/pages/CheckoutPage";
import PaymentSuccessPage from "./frontend/pages/PaymentSuccessPage";
import Layout from "./frontend/components/Layout";
import { CartProvider } from "./frontend/contexts/CartContext";
import { AuthProvider } from "./frontend/contexts/AuthContext";
import StripeWrapper from "./frontend/components/StripeWrapper";
import { checkAndInitializeData } from "./scripts/initFirebaseData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Component to initialize Firebase data
const FirebaseInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize Firebase data when app starts
    checkAndInitializeData().catch(console.error);
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <FirebaseInitializer>
        <AuthProvider>
          <CartProvider>
            <StripeWrapper>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/payment-success" element={<PaymentSuccessPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </StripeWrapper>
          </CartProvider>
        </AuthProvider>
      </FirebaseInitializer>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
