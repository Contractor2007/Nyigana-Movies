import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';

export default function Card({ result }) {
  return (
    <div className='group cursor-pointer hover:shadow-xl shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 m-2 transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 hover:scale-105'>
      <Link href={`/movie/${result.id}`}>
        <div className='relative overflow-hidden'>
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              result.backdrop_path || result.poster_path
            }`}
            width={500}
            height={300}
            alt={result.title || result.name}
            className='rounded-t-xl group-hover:scale-110 transition-transform duration-300'
          />
          <div className='absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm font-bold'>
            {result.vote_average?.toFixed(1)}
          </div>
        </div>
        <div className='p-4'>
          <h2 className='text-lg font-bold truncate mb-2'>
            {result.title || result.name}
          </h2>
          <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400 mb-3'>{result.overview}</p>
          <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
            <span>{result.release_date || result.first_air_date}</span>
            <div className='flex items-center gap-1'>
              <FiThumbsUp className='h-4' />
              <span>{result.vote_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
