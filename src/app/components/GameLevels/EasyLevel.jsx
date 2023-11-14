// 'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Menu.module.css';

const levelButton =
  'flex flex-col items-center justify-evenly text-gray-800 text-5xl w-96 h-96';

export default function EasyLevel() {
  const router = useRouter();

  const goToGame = () => {
    try {
      router.push('/game?level=easy');
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  return (
    <div
      className={`${levelButton} bg-yellow-300 ${styles.levelBox}`}
      onClick={goToGame}
    >
      <h3>Easy</h3>
      <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
      <p className="text-2xl">4 cards</p>
    </div>
  );
}
