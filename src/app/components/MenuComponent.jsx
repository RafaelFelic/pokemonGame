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
        className={`${styles.h2} text-3xl md:text-6xl text-blue-400 mb-10 md:mb-32`}
      >
        Choose your level
      </h2>
      {/* Alterna entre row e coluna dependendo do tamanho da tela */}
      <div className="flex flex-col md:flex-row justify-around items-center w-full px-8">
        <EasyLevel />
        <MediumLevel />
        <HardLevel />
      </div>
    </div>
  );
}
