import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Menu.module.css';

const levelButton =
  'flex flex-col items-center justify-evenly text-gray-800 text-5xl w-96 h-96';

export default function HardLevel() {
  const router = useRouter();

  const goToGame = () => {
    try {
      router.push('/game?level=hard');
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  return (
    <div
      className={`${levelButton} bg-red-500 ${styles.levelBox}`}
      onClick={goToGame}
    >
      <h3>Hard</h3>
      <div className="flex flex-row">
        <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
        <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
        <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
      </div>
      <p className="text-2xl">16 cards</p>
    </div>
  );
}
