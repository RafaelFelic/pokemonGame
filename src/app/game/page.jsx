'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Game.module.css';

export default function Game() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const initialLevel = searchParams.get('level');

  const [level, setLevel] = useState(initialLevel);
  const [cards, setCards] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [timer, setTimer] = useState(60);
  const [lives, setLives] = useState(10);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1500'
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
    if (pokemons.length > 0 && level) {
      initializeCards();
      const timerId = startTimer();
      return () => clearInterval(timerId);
    }
  }, [pokemons, level]);

  const initializeCards = () => {
    const pairCounts = { easy: 2, medium: 4, hard: 8 };

    if (pokemons.length === 0) return;

    // Embaralha e seleciona os primeiros N Pokémon
    const shuffledPokemons = [...pokemons].sort(() => 0.5 - Math.random());
    const selectedCards = shuffledPokemons
      .slice(0, pairCounts[level])
      .map((pokemon) => {
        // Extrai o ID do Pokémon a partir da URL
        const idMatch = pokemon.url.match(/pokemon\/(\d+)\//);
        const pokemonId = idMatch ? idMatch[1] : null;

        if (!pokemonId) {
          console.error('Pokemon ID is undefined for:', pokemon);
          return null; // ou lidar com isso de outra maneira
        }

        return {
          id: pokemonId,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          isFlipped: false,
          isMatched: false,
        };
      })
      .filter((card) => card !== null); // Remove cartas com ID indefinido

    const gameCards = [...selectedCards, ...selectedCards].map(
      (card, index) => ({
        ...card,
        id: index,
      })
    );

    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerId);
          setIsGameOver(true);
        }
        return prevTimer - 1;
      });
    }, 1000);
    return timerId;
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

    // Se duas cartas estão viradas, verifica se combinam.
    if (flippedCards.length === 2) {
      // Verifica a correspondência das cartas.
      if (flippedCards[0].name === flippedCards[1].name) {
        setScore(score + 1); // Aumenta a pontuação.
        setCards(
          updatedCards.map((card) =>
            flippedCards.includes(card) ? { ...card, isMatched: true } : card
          )
        ); // Marca as cartas como correspondidas.
      } else {
        setLives(lives - 1); // Reduz uma vida.
        // Define um temporizador curto para desvirar as cartas se não combinarem.
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

  return (
    <div className={`${styles.gameContainer}`}>
      <div className={`${styles.gameInfo}`}>
        <div className="timer">Time left: {timer} seconds</div>
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {lives}</div>
      </div>
      <div className={`${styles.cardsGrid} ${styles[level]}`}>
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
              <div className={`${styles.cardInner}`}>
                <div className={`${styles.cardFront}`}>
                  <img src={card.image} alt={card.name} />
                </div>
                <div className={`${styles.cardBack}`}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
