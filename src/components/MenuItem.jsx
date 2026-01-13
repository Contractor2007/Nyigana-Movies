import Link from 'next/link';

export default function MenuItem({ title, address, Icon }) {
  return (
    <Link href={address} className='hover:text-blue-500 transition-colors duration-200 flex items-center gap-1'>
      <Icon className="text-2xl sm:hidden"/>
      <p className='uppercase hidden sm:inline text-sm font-semibold'>{title}</p>
    </Link>
  );
}
