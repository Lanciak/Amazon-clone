
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setErrorMessage("");
    
    try {
      console.log("Submitting registration for:", values.email);
      const success = await registerUser(values.name, values.email, values.password);
      if (success) {
        // Navigate after successful registration
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Registration submission error:", error);
      setErrorMessage(error.message || "An error occurred during registration");
    }
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
          <h2 className="text-2xl font-medium mb-4">Create account</h2>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>There was a problem</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="At least 6 characters"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-600 mt-1">
                      Passwords must be at least 6 characters.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-3 rounded-md border border-[#FCD200] shadow-sm"
              >
                {isLoading ? "Creating account..." : "Create your Amazon account"}
              </Button>
            </form>
          </Form>

          <p className="text-xs text-gray-600 mt-4">
            By creating an account, you agree to Amazon Clone's{" "}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Privacy Notice
            </a>
            .
          </p>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
