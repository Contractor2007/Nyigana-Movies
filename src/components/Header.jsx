import Link from 'next/link';
import MenuItem from './MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-4 max-w-6xl mx-auto border-b border-gray-200 dark:border-gray-600'>
      <div className='flex gap-6'>
        <MenuItem title='home' address='/' Icon={AiFillHome} />
        <MenuItem title='about' address='/about' Icon={BsFillInfoCircleFill} />
      </div>
      <div className='flex items-center gap-4'>
        <DarkModeSwitch />
        <Link href={'/'} className='flex gap-2 items-center group'>
          <span className='text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-3 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
            Nyigana
          </span>
          <span className='text-xl font-semibold hidden sm:inline bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent'>Movies</span>
        </Link>
      </div>
    </div>
  );
}
