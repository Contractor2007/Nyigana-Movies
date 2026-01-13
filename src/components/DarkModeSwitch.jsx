'use client';

import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;
  useEffect(() => setMounted(true), []);
  return (
    <div>
      {mounted &&
        (currentTheme === 'dark' ? (
          <MdLightMode
            onClick={() => setTheme('light')}
            className='text-2xl cursor-pointer hover:text-yellow-400 transition-colors duration-200'
          />
        ) : (
          <MdDarkMode
            onClick={() => setTheme('dark')}
            className='text-2xl cursor-pointer hover:text-blue-500 transition-colors duration-200'
          />
        ))}
    </div>
  );
}
