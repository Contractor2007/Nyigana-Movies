'use client';

import { useEffect } from 'react';
export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className='flex flex-col items-center justify-center mt-20 px-4'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-md text-center'>
        <h1 className='text-2xl font-bold text-red-500 mb-4'>Oops! Something went wrong</h1>
        <p className='text-gray-700 dark:text-gray-300 mb-6'>
          We encountered an error. Please try again.
        </p>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
