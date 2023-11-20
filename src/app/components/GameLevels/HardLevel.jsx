import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Menu.module.css';

const levelButton =
  'flex flex-col items-center justify-evenly py-3 text-gray-800 w-48 md:w-96 h-32 md:h-96 rounded-lg';

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
      className={`${levelButton} bg-red-500 ${styles.levelBox}  cursor-pointer`}
      onClick={goToGame}
      role="button"
      tabIndex="0"
    >
      <h3 className="text-3xl md:text-5xl">Hard</h3>
      <div className="flex flex-row justify-center">
        <img className="w-8 md:w-28" src="/img/pokeball.svg" alt="Pokeball" />
        <img className="w-8 md:w-28" src="/img/pokeball.svg" alt="Pokeball" />
        <img className="w-8 md:w-28" src="/img/pokeball.svg" alt="Pokeball" />
      </div>
      <p className="text-lg md:text-2xl">16 cards</p>
    </div>
  );
}
