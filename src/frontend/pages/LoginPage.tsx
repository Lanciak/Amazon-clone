
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email) {
      setErrorMessage("Enter your email");
      return;
    }
    
    if (!password) {
      setErrorMessage("Enter your password");
      return;
    }

    try {
      console.log("Submitting login form for:", email);
      const success = await login(email, password);
      if (success) {
        console.log("Login successful, navigating to /home");
        navigate("/home");
      } else {
        console.log("Login failed but no exception thrown");
        setErrorMessage("Invalid email or password");
      }
    } catch (error: any) {
      console.error("Login submission error:", error);
      setErrorMessage(error.message || "An error occurred during sign in");
    }
  };

  // For demo/testing - this function pre-fills the login form with test credentials
  const fillTestCredentials = () => {
    setEmail("user@example.com");
    setPassword("password");
    toast({
      title: "Test credentials filled",
      description: "You can now click Sign in to test the login",
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-6 pb-16">
      <Link to="/home" className="mb-4">
        <h1 className="text-3xl font-bold">
          <span className="text-[#FF9900]">amazon</span>
          <span className="text-sm">.clone</span>
        </h1>
      </Link>

      <div className="w-full max-w-sm mx-auto">
        <div className="border border-gray-300 rounded-md p-6">
          <h2 className="text-2xl font-medium mb-4">Sign in</h2>

          {errorMessage && (
            <div className="border border-red-600 bg-red-50 rounded-md p-3 mb-4">
              <p className="text-sm font-bold text-red-700">There was a problem</p>
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900]"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-3 rounded-md border border-[#FCD200] shadow-sm"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-4">
            By continuing, you agree to Amazon Clone's{" "}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Privacy Notice
            </a>
            .
          </p>
          
          <div className="flex items-center my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="text-xs text-gray-600 px-2">New to Amazon?</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          
          <Link
            to="/register"
            className="block w-full text-center border border-gray-300 rounded-md py-1 px-3 text-sm hover:bg-gray-100"
          >
            Create your Amazon account
          </Link>
        </div>

        <div className="mt-4 text-xs text-center">
          <p className="mb-1">Demo credentials:</p>
          <p>Email: user@example.com</p>
          <p>Password: password</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fillTestCredentials} 
            className="mt-2 text-[#007185] hover:text-[#C7511F]"
          >
            Fill test credentials
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
