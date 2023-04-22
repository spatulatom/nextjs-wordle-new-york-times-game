import React from 'react';
import { useEffect, useState } from 'react';

export default function Game() {
  const [solution, setSolution] = useState('');
  //   why nulls not empty strings in the first place
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event: any) => {
      if (gameOver) {
        return;
      }

      if (event.key === 'Enter') {
        if (currentGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((element) => element == null)] =
          currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setGameOver(true);
        }
      }
      if (event.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

// to prevent other keys than letters
const isLetter = event.key.match(/^[a-z]{1}$/) != null
if(isLetter){

      // the array elemments are uppercase so we need to change key events as well
      // othwerwise styling comparison in Line component is not working a === A is false
      setCurrentGuess((oldGuess) => oldGuess + event.key.toUpperCase());}
    };

   
    window.addEventListener('keydown', handleType);

    // on onmount:
    return () => window.removeEventListener('keydown', handleType);
  }, [currentGuess]);

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
      <p>{currentGuess}</p>
      <h2 className="mb-4">{solution}</h2>
      {guesses.map((guess, i) => {
        const isCurrentGuess =
          i === guesses.findIndex((element) => element == null); // this will evelute to true or false
        return (
          // https://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-truehttps://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-true
          // Nullish Coalescing Operator
          // if guess is null it will be turned into empty string '' on props: guess?? ''
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ''}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </>
  );
}
type props = {
  guess: any;
  isFinal: any;
  solution: string;
};

function Line({ guess, isFinal, solution }: props) {
  const WORD_LENGTH = 5;
  //   this will be array of 5 divs and since its array of div no need to map over
  // it - remeber map() accutally returns an array of JSX elements
  const tiles = [];

  // if guess is null it will be turned into empty string '' on props: guess?? ''so
  // for loop can loop through ''[0], ''[1]... and not null[0], null[1]
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    // console.log('hrtr', char) // when char ='' this code will evalute to undefinded
    console.log('soltution', solution, char);
    let tile = 'bg-black';
    if (isFinal) {
      if (char === solution[i]) {
        console.log('here 1');
        tile = 'bg-green-400';
      } else if (solution.includes(char)) {
        console.log('here 2');
        tile = 'bg-yellow-500';
      } else {
        console.log('here 3');
        tile = 'bg-gray-400';
      }
    }
    tiles.push(
      <div
        key={i}
        className={`${tile} w-16 h-16 border flex justify-center items-center uppercase text-xl`}
      >
        {char}
      </div>
    );
  }

  return <div className="flex gap-2 mb-3">{tiles}</div>;
}
