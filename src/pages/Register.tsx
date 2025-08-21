import React, { useState } from 'react';

import deliveryImage from '/logo.jpg';
import LoginForm from '@/components/form/LoginForm';
import RegisterForm from '@/components/form/RegisterForm';

export const Register: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-purple-400">
        <div className="text-center text-white">
          <img src={deliveryImage} alt="Parcel Delivery" className="max-w-sm mx-auto lg:max-w-md" />
          <h1 className="mt-6 text-4xl font-bold">Easy Parcel BD</h1>
          <p className="mt-2 text-lg text-purple-200">আপনার পার্সেল ডেলিভারি এখন আরও সহজ ও দ্রুত।</p>
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-600 mb-4 pb-2 border-b-gray-400 border-b">
              {isLoginView ? 'Login to Your Account' : 'Create Account'}
            </h2>
           
            {/* animation view */}
            <div key={isLoginView ? 'login' : 'register'} className="animate-fadeIn animate-duration-500">
              {isLoginView ? <LoginForm /> : <RegisterForm />}
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isLoginView ? "Don't have an account? /" : "Already have an account? /"}
              <span
                onClick={toggleView}
                className="ml-2 font-bold text-purple-500 hover:text-purple-500 cursor-pointer"
              >
                {isLoginView ? 'Register' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

