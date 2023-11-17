'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Note: Updated import for useRouter
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import styles from '../styles/Header.module.css';
import 'flowbite';

export default function HeaderComponent() {
  const router = useRouter();

  const handleHeaderClick = () => {
    router.push('/'); // Redirects to the main menu
  };

  return (
    <header
      onClick={handleHeaderClick}
      className={`${styles.header} flex justify-center items-center text-6xl font-black fixed inset-x-0 top-0 z-50 text-white tracking-wider p-1 cursor-pointer`}
      role="banner" // Accessibility: Role for semantic HTML
      aria-label="Memory Game Header" // Accessibility: Aria-label for understanding the element's purpose
    >
      <div
        role="button" // Accessibility: Making the logo a button
        aria-label="Go to home page" // Accessibility: Aria-label for screen readers
        tabIndex="0" // Accessibility: Making the div focusable
      >
        <Image
          src="/img/logo.png"
          alt="Memory Game Logo" // Accessibility: Descriptive alt text for the logo
          width={400} // Adjust as needed
          height={400} // Adjust as needed
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black">
        Memory Game
      </h1>
    </header>
  );
}
