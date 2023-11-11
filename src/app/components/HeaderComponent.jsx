import React from 'react';
import styles from '../styles/Header.module.css';
import 'flowbite';

export default function HeaderComponent() {
  return (
    <header
      className={`${styles.header} flex justify-center items-center text-6xl font-black fixed inset-x-0 top-0 z-50 text-white tracking-wider`}
    >
      <img className="h-44 m-5" src="/img/logo.png" alt="logo" />
      <h1>Memory Game</h1>
    </header>
  );
}
