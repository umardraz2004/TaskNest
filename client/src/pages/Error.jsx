import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
      <div className="text-center">
        <h1 className="text-[10rem] font-bold text-red-400 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-6">Oops! The page you're looking for does not exist.</p>
        <Link
          to="/"
          className="text-white bg-teal-300 hover:bg-teal-500 font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Go Back Home
        </Link>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5">
        <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default Error;
