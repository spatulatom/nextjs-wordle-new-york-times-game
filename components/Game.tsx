import React from 'react';
import { useEffect, useState } from 'react';

export default function Game() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));

  const fetchWord = async () => {
    const response = await fetch('api/hello');
    const words = await response.json();

    // Math.random gives us number 0 to 1, multipy by how many word there are, and floor that
    // 2.5 would be 2
    const randomWord =
      words.words[Math.floor(Math.random() * words.words.length)];
    setSolution(randomWord);
  };

  useEffect(() => {
    fetchWord();
  }, []);
  const lklk = () => {
    fetchWord();
  };
  return (
    <>
    
      <p className="text-white" onClick={lklk}>
        Click
      </p>
      <h2 className='mb-4'>{solution}</h2>
      {guesses.map((guess) => {
        return (
          // https://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-truehttps://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-true
          // Nullish Coalescing Operator
          <Line guess={guess ?? ''} />
        );
      })}
    </>
  );
}
type props = {
  guess: any;
};

function Line({ guess }: props) {
  const WORD_LENGTH = 5;
  const tiles = [];

  // if guess is null it will be turned into empty string '' so
  // we need rather for loop then map() here
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    tiles.push(
      <div key={i} className="w-16 h-16 border">
        {char}
      </div>
    );
  }
  console.log('tiles', tiles);
  return <div className="flex gap-2 mb-3">{tiles}</div>;
}
