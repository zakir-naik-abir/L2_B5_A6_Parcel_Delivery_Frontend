// src/components/AboutPage.tsx

import React from 'react';
import { FiTruck, FiTarget, FiEye, FiZap, FiThumbsUp, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-blue-300 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">About Easy Parcel BD</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Your Trusted Delivery Partner for Fast, Secure, and Hassle-free Shipping Across Bangladesh.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 mb-6">
              At Easy Parcel BD, our mission is to revolutionize the logistics industry in Bangladesh. We aim to provide a seamless, tech-driven delivery experience that empowers businesses and connects individuals with unparalleled efficiency and reliability.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiTarget className="text-blue-600 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Our Mission</h3>
                  <p className="text-gray-500">To offer the fastest and most dependable parcel delivery service, ensuring customer satisfaction at every step.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiEye className="text-blue-600 text-3xl mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Our Vision</h3>
                  <p className="text-gray-500">To become the leading logistics network in Bangladesh, celebrated for our innovation, customer-centric approach, and nationwide reach.</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" md:block">
            <img src="https://internationaltransportagency.com/wp-content/uploads/2025/01/istockphoto-1474043686-612x612-2.jpg" alt="Our Team" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">We are not just a courier service; we are your growth partner. We provide solutions that make logistics easy for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <FiZap className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Lightning Fast Delivery</h3>
              <p className="text-gray-500">We ensure your parcels reach their destination in the shortest possible time with our optimized delivery routes.</p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <FiThumbsUp className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Unmatched Reliability</h3>
              <p className="text-gray-500">With real-time tracking and dedicated support, you can always count on us to deliver your commitments.</p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <FiShield className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Secure Handling</h3>
              <p className="text-gray-500">Every parcel is treated with the utmost care. We guarantee secure handling from pickup to delivery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Core Values Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">Our Core Values</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="flex items-center flex-col">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2">
                <FiHeart size={28} />
              </div>
              <span className="font-semibold">Customer First</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2">
                <FiTruck size={28} />
              </div>
              <span className="font-semibold">Integrity</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2">
                <FiTarget size={28} />
              </div>
              <span className="font-semibold">Commitment</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2">
                <FiZap size={28} />
              </div>
              <span className="font-semibold">Innovation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action (CTA) Section */}
      <div className="bg-purple-300">
        <div className="container mx-auto px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship with Ease?</h2>
          <p className="max-w-2xl mx-auto mb-8">Join thousands of businesses and individuals who trust Easy Parcel BD for their delivery needs.</p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto group">
            Create an Account
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
