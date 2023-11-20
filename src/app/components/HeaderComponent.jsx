'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Header.module.css';
import 'flowbite';

export default function HeaderComponent() {
  const router = useRouter();

  const headerClick = () => {
    router.push('/');
  };

  return (
    <header
      onClick={headerClick}
      className={`${styles.header} z-50 text-white tracking-widest cursor-pointer`}
      role="banner"
      aria-label="Memory Game Header"
    >
      <div className="flex justify-center items-center fixed top-0 left-0 right-0 mt-2 md:mt-3 w-60 md:w-full mx-auto">
        <img
          src="/img/logo.png"
          alt="Memory Game Logo"
          className="w-64 md:w-[450px]"
        />
        <h1 className="text-2xl md:text-5xl lg:text-6xl ml-2 font-black">
          Memory Game
        </h1>
      </div>
    </header>
  );
}
