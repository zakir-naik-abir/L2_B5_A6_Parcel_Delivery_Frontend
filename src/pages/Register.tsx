import React, { useState } from "react";

import deliveryImage from "/logo.jpg";
import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import { Button } from "@/components/ui/button";
import config from "@/config/env";
import { cn } from "@/lib/utils";

export const Register: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className={cn("min-h-screen bg-gray-100 flex flex-col lg:flex-row")}>
      {/* Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-purple-400">
        <div className="text-center text-white">
          <img
            src={deliveryImage}
            alt="Parcel Delivery"
            className="max-w-sm mx-auto lg:max-w-md"
          />
          <h1 className="mt-6 text-4xl font-bold">Easy Parcel BD</h1>
          <p className="mt-2 text-lg text-purple-200">
            আপনার পার্সেল ডেলিভারি এখন আরও সহজ ও দ্রুত।
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-purple-400 mb-4 pb-2 border-b-purple-400 border-b">
              {isLoginView ? "Login to Your Account" : "Create Account"}
            </h2>

            {/* animation view */}
            <div
              key={isLoginView ? "login" : "register"}
              className="animate-fadeIn animate-duration-500"
            >
              {isLoginView ? <LoginForm /> : <RegisterForm />}
            </div>

            <div className="py-4 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue
          </span>
        </div>

            <Button
              onClick={() => window.open(`${config.baseUrl}/auth/google`)}
              type="button"
              variant="default"
              className="w-full cursor-pointer bg-purple-400 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-colors duration-300"
            >
              Login with Google
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isLoginView
                ? "Don't have an account? /"
                : "Already have an account? /"}
              <span
                onClick={toggleView}
                className="ml-2 font-bold text-purple-500 hover:text-purple-500 cursor-pointer"
              >
                {isLoginView ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
