import React from 'react';
import { useEffect, useState } from 'react';

export default function Game() {
  const [solution, setSolution] = useState('');
  const [guess, setGuesses] = useState(Array(6).fill(null));

  const fetchWord = async () => {
    const response = await fetch('api/hello');
    const words = await response.json();

    // Math.random gives us number 0 to 1, multipy by how many word there are, and floor that
    // 2.5 would be 2
    const randomWord =
      words.words[Math.floor(Math.random() * words.words.length)];
    console.log('kjkj', randomWord);
    setSolution(randomWord);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <>
      <div>Game </div>
      <p className="text-white">{solution}</p>
    </>
  );
}
