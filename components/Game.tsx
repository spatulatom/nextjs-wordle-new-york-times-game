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
    setSolution(randomWord)
  
  };

  useEffect(() => {
    fetchWord();
  }, []);
const lklk = ()=>{
    fetchWord()
   
}
  return (
    <>
      <div>Game </div>
      <p className="text-white" onClick={lklk}>Click</p>
      <h2>{solution}</h2>
      {guesses.map(guess=>{
        return(
            <Line guess={guess?? ''}/>
        )
      })}
    </>
  );
}
type props ={
    guess: any
}

function Line({guess}:props) {
    const WORD_LENGTH = 5;
    const tiles = []
for(let i =0; i < WORD_LENGTH; i++){
 const char = guess[i];

}

  return (
    <div>Game</div>
  )
}
