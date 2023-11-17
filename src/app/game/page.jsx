'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React from 'react';
import 'flowbite';
import styles from '../styles/Game.module.css';

export default function Game() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLevel = searchParams.get('level');

  const [level, setLevel] = useState(initialLevel);
  const [cards, setCards] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [timer, setTimer] = useState(60);
  const [lives, setLives] = useState(10);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const timerIdRef = useRef(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
        );
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && cards.length > 0) {
      clearInterval(timerIdRef.current); // Stop the timer immediately
      setIsGameOver(true);
      setHasWon(true);
      document.getElementById('winSound').play();
    }
  }, [cards]);

  useEffect(() => {
    if (timer === 0 || lives < 1) {
      clearInterval(timerIdRef.current); // Stop the timer immediately
      setIsGameOver(true);
      document.getElementById('loseSound').play();
    }
  }, [timer, lives]);

  useEffect(() => {
    if (pokemons.length > 0 && level) {
      initializeCards();
      const timerId = startTimer();
      return () => clearInterval(timerId);
    }
  }, [pokemons.length, level]);

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  const initializeCards = () => {
    const pairCounts = { easy: 2, medium: 4, hard: 8 };

    if (pokemons.length === 0) return;

    // Shuffle the pokemons array
    const shuffledPokemons = [...pokemons].sort(() => 0.5 - Math.random());

    // Select the first few pokemons based on the level
    const selectedPokemons = shuffledPokemons.slice(0, pairCounts[level]);

    // Create pairs of cards
    const gameCards = selectedPokemons.flatMap((pokemon) => {
      const idMatch = pokemon.url.match(/pokemon\/(\d+)\//);
      const pokemonId = idMatch ? idMatch[1] : null;
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

      return [
        {
          id: `${pokemonId}-1`,
          name: pokemon.name,
          image: imageUrl,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `${pokemonId}-2`,
          name: pokemon.name,
          image: imageUrl,
          isFlipped: false,
          isMatched: false,
        },
      ];
    });

    // Shuffle the game cards
    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
  };

  const startTimer = () => {
    clearInterval(timerIdRef.current); // Clear any existing timer

    timerIdRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerIdRef.current); // Stop the timer
          if (prevTimer === 1) {
            setIsGameOver(true); // Set game over if the timer runs out
          }
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  let flipTimeout = null; // Variável global para armazenar o temporizador

  const flipCard = (cardId) => {
    // Primeiro, verifica se a carta clicada já está combinada.
    const cardAlreadyMatched = cards.some(
      (card) => card.id === cardId && card.isMatched
    );
    if (cardAlreadyMatched) {
      // Se a carta já está combinada, não faz nada e sai da função.
      return;
    }

    // Continua com a lógica existente para virar a carta.
    let updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
    );

    // Se houver um temporizador ativo, cancela-o.
    if (flipTimeout) {
      clearTimeout(flipTimeout);
      flipTimeout = null;
    }

    // Filtra todas as cartas que estão viradas para cima e não são correspondidas.
    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    // Se clicar em uma terceira carta, desvira as duas anteriores imediatamente.
    if (flippedCards.length > 2) {
      updatedCards = updatedCards.map((card) =>
        !card.isMatched ? { ...card, isFlipped: false } : card
      );
    }

    setCards(updatedCards); // Atualiza o estado para refletir as mudanças.

    // If two cards are flipped, check if they match.
    if (flippedCards.length === 2) {
      const cardsMatch = flippedCards[0].name === flippedCards[1].name; // Check for match

      if (cardsMatch) {
        document.getElementById('matchSound').play();
        matchSound.currentTime = 0;
        setScore(score + 1); // Increase the score.
        setCards(
          updatedCards.map((card) =>
            flippedCards.includes(card) ? { ...card, isMatched: true } : card
          )
        ); // Mark the cards as matched.
      } else {
        setLives(lives - 1); // Reduce a life.
        // Set a short timer to flip the cards back if they don't match.
        flipTimeout = setTimeout(() => {
          setCards(
            updatedCards.map((card) =>
              !card.isMatched ? { ...card, isFlipped: false } : card
            )
          );
          flipTimeout = null;
        }, 1000);
      }
    }
  };
  const GameOverModal = ({
    onRestart,
    onMainMenu,
    onNextLevel,
    hasWon,
    level,
  }) => (
    <div className="fixed inset-0 flex items-center justify-center text-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-2 m-3">
        <h2
          className={
            hasWon
              ? 'text-blue-500 text-3xl md:text-4xl font-bold text-center'
              : 'text-red-500 text-5xl font-bold p-2 text-center'
          }
        >
          {hasWon ? 'CONGRATULATIONS!!!' : 'GAME OVER'}
        </h2>
        {hasWon && (level === 'easy' || level === 'medium') && (
          <button
            onClick={onNextLevel}
            className="bg-blue-700 text-white m-1 px-4 py-2 rounded-full mt-4"
          >
            NEXT LEVEL
          </button>
        )}
        <button
          onClick={onRestart}
          className="bg-blue-700 text-white m-1 px-4 py-2 rounded-full mt-2"
        >
          RESTART LEVEL
        </button>
        <button
          onClick={onMainMenu}
          className="bg-blue-700 text-white m-1 px-4 py-2 rounded-full mt-2"
        >
          MAIN MENU
        </button>
      </div>
    </div>
  );

  const handleMainMenu = () => {
    router.push('/');
  };

  const handleNextLevel = () => {
    let nextLevel = 'medium'; // default to medium for this example
    if (level === 'easy') {
      nextLevel = 'medium';
    } else if (level === 'medium') {
      nextLevel = 'hard';
    } // Add more conditions if there are more levels

    // Reset states
    setCards([]);
    setTimer(60);
    setLives(10);
    setScore(0);
    setIsGameOver(false);
    setHasWon(false);

    // Update the level and URL
    setLevel(nextLevel);
    router.push(`/game?level=${nextLevel}`, undefined, { shallow: true });
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setHasWon(false);
    setTimer(60);
    setLives(10);
    setScore(0);
    setCards([]); // Reset the cards before initializing new ones
    initializeCards();
    startTimer();
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isGameOver && (
        <GameOverModal
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
          onNextLevel={handleNextLevel}
          hasWon={hasWon}
          level={level}
        />
      )}
      <div
        className={`${styles.gameInfo} flex absolute top-[110px] md:top-[160px] w-full justify-around text-white p-5 mb-5 z-10 `}
      >
        <div className="timer">Time left: {timer} seconds</div>
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {lives}</div>
      </div>
      <div className={`grid mx-auto mt-[9%] gap-2.5 ${styles[level]}`}>
        {cards.length === 0 ? (
          <p>Loading...</p>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card} ${
                !card.isFlipped ? styles.cardFlipped : ''
              }`}
              onClick={() => flipCard(card.id)}
            >
              <div className={`${styles.cardInner} w-full h-full relative`}>
                <div
                  className={`${styles.cardFront} absolute text-center bg-[#ececec] border border-white rounded shadow w-full h-full`}
                >
                  <LazyLoadImage
                    src={card.image}
                    alt={card.name}
                    className={`w-full h-full`}
                    loading="lazy"
                  />
                </div>
                <div
                  className={`${styles.cardBack} flex justify-center items-center text-xl font-bold absolute text-center bg-[#ececec] border border-white rounded shadow w-full h-full`}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <audio id="winSound" src="/audio/win.wav" preload="auto"></audio>
        <audio id="loseSound" src="/audio/loose.wav" preload="auto"></audio>
        <audio id="matchSound" src="/audio/sound.wav" preload="auto"></audio>
      </div>
    </div>
  );
}
