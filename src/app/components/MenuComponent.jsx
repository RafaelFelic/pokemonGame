'use client';
import React from 'react';
import EasyLevel from './GameLevels/EasyLevel';
import MediumLevel from './GameLevels/MediumLevel';
import HardLevel from './GameLevels/HardLevel';
import styles from '../styles/Menu.module.css';
import 'flowbite';

export default function MenuComponent() {
  return (
    <div
      className={`${styles.menu} fixed inset-0 flex flex-col justify-center items-center w-9/10 max-w-[1200px] mx-auto my-auto`}
    >
      <h2
        className={`${styles.h2} text-2xl md:text-5xl lg:text-4xl text-blue-400 z-50 mb-2 md:mb-6`}
      >
        Choose your level
      </h2>
      <div className="flex flex-col md:flex-row gap-2 items-center w-full px-8">
        <EasyLevel />
        <MediumLevel />
        <HardLevel />
      </div>
    </div>
  );
}
