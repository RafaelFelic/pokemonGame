import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Menu.module.css';

const levelButton =
  'flex flex-col items-center justify-evenly text-gray-800 text-5xl mb-5 py-3 w-48 md:w-96 h-full md:h-96';

export default function MediumLevel() {
  const router = useRouter();

  const goToGame = () => {
    try {
      router.push('/game?level=medium');
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };

  return (
    <div
      className={`${levelButton} bg-blue-500 ${styles.levelBox} hover:shadow-lg focus:outline-none focus:shadow-outline cursor-pointer`}
      onClick={goToGame}
      role="button"
      tabIndex="0"
    >
      <h3 className="text-3xl md:text-5xl">Medium</h3>
      <div className="flex flex-row justify-center">
        <img className="w-12 md:w-20" src="/img/pokeball.png" alt="Pokeball" />
        <img className="w-12 md:w-20" src="/img/pokeball.png" alt="Pokeball" />
      </div>
      <p className="text-xl md:text-2xl">8 cards</p>
    </div>
  );
}
