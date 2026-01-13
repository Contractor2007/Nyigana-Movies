'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };
  return (
    <form
      className='flex gap-3 px-5 max-w-6xl mx-auto my-6'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='Search for movies...'
        className='w-full h-12 rounded-lg placeholder-gray-400 outline-none border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 flex-1 px-4 focus:border-blue-500 transition-colors duration-200'
        maxLength={60}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
        disabled={search === ''}
      >
        Search
      </button>
    </form>
  );
}
