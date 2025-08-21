import React, { useState } from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiShare2, FiUser, FiEdit3, FiSend 
} from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log('Form Data Submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 shadow-xl rounded-lg overflow-hidden bg-white">
        
        {/* contact information */}
        <div className="p-8 md:p-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Contact Us</h1>
            <p className="mt-4 text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque inventore
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="flex items-start">
              <div className="text-red-600 text-2xl mr-4 mt-1"><FiMapPin /></div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Location</h3>
                <p className="text-gray-600 text-sm">Bonani, 2nd block,</p>
                <p className="text-gray-600 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="text-red-600 text-2xl mr-4 mt-1"><FiPhone /></div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                <p className="text-gray-600 text-sm">+88 01815-435734</p>
                <p className="text-gray-600 text-sm">+88 01788-119167</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="text-red-600 text-2xl mr-4 mt-1"><FiMail /></div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                <p className="text-gray-600 text-sm">zakrihasanabir@gmail.com</p>
                <p className="text-gray-600 text-sm">www.zakirhasanabir.com</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start">
              <div className="text-red-600 text-2xl mr-4 mt-1"><FiShare2 /></div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Social</h3>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"><FaFacebookF size={14}/></a>
                  <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"><FaTwitter size={14}/></a>
                  <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"><FaInstagram size={14}/></a>
                  <a href="#" className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"><FaYoutube size={14}/></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div className="bg-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800">Fill Up The Form</h2>
          <p className="mt-2 text-sm text-gray-500 mb-8">
            Your email address will not be published. Required fields are marked *
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiUser />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 py-2 pl-10 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiMail />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 py-2 pl-10 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute left-3 top-4 text-gray-400">
                <FiEdit3 />
              </div>
              <textarea
                name="message"
                placeholder="Enter Your Message here"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 py-2 pl-10 focus:outline-none focus:border-red-600 transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
            >
              <FiSend />
              Get In Touch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;