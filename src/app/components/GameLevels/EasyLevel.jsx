import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Menu.module.css';

const levelButton =
  'flex flex-col items-center justify-evenly mb-1 py-3 text-gray-800 text-5xl w-48 md:w-96 h-32 md:h-96';

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
      className={`${levelButton} bg-yellow-300 ${styles.levelBox} hover:shadow-lg focus:outline-none focus:shadow-outline cursor-pointer`}
      onClick={goToGame}
      role="button"
      tabIndex="0"
    >
      <h3 className="text-3xl md:text-5xl">Easy</h3>
      <img className="w-12 md:w-20" src="/img/pokeball.png" alt="Pokeball" />
      <p className="text-xl md:text-2xl">4 cards</p>
    </div>
  );
}
