import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Line from './Line';
import Modal from './Modal';


export default function Game() {
  const [solution, setSolution] = useState('');
  //   why nulls not empty strings in the first place
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTheSolution, setShowTheSolution] = useState(false)

  const buttonRef:any = useRef(null)
  const keyboardRef:any =  useRef(null)

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
        // The findIndex() method returns the index of THE FIRST element in an array that satisfies the provided testing function
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
      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        // the array elemments are uppercase so we need to change key events as well
        // othwerwise styling comparison in Line component is not working a === A is false
        setCurrentGuess((oldGuess) => oldGuess + event.key.toUpperCase());
      }
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

  //rules of the game modal handler
  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };
  const startNewGame = () =>{
    setCurrentGuess('')
    setGuesses(Array(6).fill(null))
    setGameOver(false)
    fetchWord()
    buttonRef.current.blur();
}

const handleKeyboard =()=>{
  keyboardRef.current.focus()
}

const handleShowTheSolution = ()=>{
  setShowTheSolution(prev=> true )
  setTimeout(()=>setShowTheSolution(false), 200)
}
  return (
    <>
      {/* <p className="text-white" onClick={lklk}>
        Click
      </p> */}
      {gameOver ? <p className='p-4'>CONGRATULATION, YOU WON!! The solution word is: {solution}</p> : ''}
      <h2 onClick={handleShowTheSolution} className="mb-4 p-2 rounded bg-green-800 transition hover:bg-green-600">Click here for solution:</h2>
      {showTheSolution?<p className='py-4'>{solution}</p>:null}
      {guesses.map((guess, i) => {
        const isCurrentGuess =
          i === guesses.findIndex((element) => element == null); // this will evelute to true or false
        return (
          // https://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-truehttps://sebhastian.com/javascript-double-question-mark/?utm_content=cmp-true
          // Nullish Coalescing Operator
          // if guess is null it will be turned into empty string '' on props: guess?? ''
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ''}
            // isGuessSubmitted={!isCurrentGuess && guess != null}
            isGuessSubmitted={guess != null}
            solution={solution}
          />
        );
      })}
{/* <button className="focus:disabled p-2 mt-8 bg-green-800 rounded-sm hover:bg-green-400 z-30 relative transition duration-500 " onClick={handleKeyboard}>Show Keyboard</button> */}

      <button
    ref={buttonRef}
      onClick={startNewGame}
       className="focus:disabled p-2 mt-8 bg-green-800 rounded-sm hover:bg-green-400 z-30 relative transition duration-500 ">
        Start a new game
      </button>
      <button
        onClick={modalHandler}
        className="p-2 mt-8 bg-green-800 rounded-sm hover:bg-green-400 z-30 relative transition duration-500 "
      >
        How To Play
      </button>
      {showModal && <Modal modalHandler={modalHandler} />}
      {/* <input className='mt-8'
      ref={keyboardRef}
      ></input> */}

    </>
  );
}
