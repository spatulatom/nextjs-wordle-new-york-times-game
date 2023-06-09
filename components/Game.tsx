import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Line from './Line';
import Modal from './Modal';
import TypoError from './TypoError';
import VirtualKeyboard from './VirtualKeyboard';

type Data = {
  words: Array<string>;
};

export default function Game() {
  const [solution, setSolution] = useState('');

  // Array of '' would be ok as well, note that
  // we are going ot have two loops in the app one with map(),
  // second 'for' loop in the line so we need to change null into ''
  // otherwise for loop wont work
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  // const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTheSolution, setShowTheSolution] = useState(false);
  const [allWords, setAllWords] = useState<Array<string> | []>([]);
  const [typoError, setTypoError] = useState(false);

  // add types
  const buttonRef: any = useRef(null);
  const keyboardRef: any = useRef(null);

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (gameOver) {
        return;
      }
      // if (event.key === 'Enter') {
      //   alert('helo');
      // }

      if (event.key === 'Enter') {
        if (currentGuess.length !== 5) {
          return;
        }

        const isWord = allWords.some((el) => el == currentGuess);
        if (!isWord) {
          setTypoError(true);
          setTimeout(() => {
            setTypoError(false);
          }, 2000);
          return;
        }

        const newGuesses = [...guesses];
        // The findIndex() method returns the index of THEelement in an array that satisfies the provided testing function
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
      const isLetter = event.key.match(/^[a-z-żźćńółęąś]{1}$/) != null;
      if (isLetter) {
        // the array elemments are uppercase so we need to change key events as well
        // othwerwise styling comparison in Line component is not working a === A is false
        setCurrentGuess((oldGuess) => oldGuess + event.key);
        console.log('CURRENT GUESS', currentGuess);
      }
    };

    // event listener React way would also be suffucient but it need to be
    // placed probably somewhere in the document directory to have the same effect like below
    window.addEventListener('keydown', handleTyping);

    // clean up:
    return () => window.removeEventListener('keydown', handleTyping);
  }, [currentGuess]);

  // so in here I ma getting curren version of the state currentGuess yet
  // above in useEffect with the same dependecies I dont get current state
  // but one letter less, why? Shouldnt i get the latest version of the
  // state in useEffect? I think its differnt becuase even in useEffect above
  // where I set up currentGuess I am using oldGuess(prevstate) to do it for the
  // exact reason becuse state there is one behind - so in other words if you
  // setting up state in useEffect and also want to get its current version it
  // can not be done in one useEffect
  useEffect(() => {
    console.log('HEREEEEE', currentGuess);
  }, [currentGuess]);

  const fetchWord = async () => {
    const response = await fetch('api/hello');
    const words: Data = await response.json();
    setAllWords(words.words);
    // Math.random gives us number 0 to 1, multipy by how many word there are, and floor that
    // 2.5 would be 2
    const randomWord =
      words.words[Math.floor(Math.random() * words.words.length)];
    setSolution(randomWord);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  //rules of the game modal handler
  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };
  const startNewGame = () => {
    setCurrentGuess('');
    setGuesses(Array(6).fill(null));
    setGameOver(false);
    fetchWord();
    buttonRef.current.blur();
  };

  const handleKeyboard = () => {
    keyboardRef.current.focus();
  };

  const handleShowTheSolution = () => {
    setShowTheSolution((prev) => true);
    setTimeout(() => setShowTheSolution(false), 400);
  };

  // VIRTUAL KEYBOARD
  // const onChange = (input: any) => {
  //   console.log('Input changed', input);
  // };

  const onKeyPress = (button: string) => {
    console.log('Button pressed', button);

    if (gameOver) {
      return;
    }
    if (button === '{enter}') {
      if (currentGuess.length !== 5) {
        return;
      }
      const isWord = allWords.some((el) => el == currentGuess);
      if (!isWord) {
        setTypoError(true);
        setTimeout(() => {
          setTypoError(false);
        }, 2000);
        return;
      }

      const newGuesses = [...guesses];
      // The findIndex() method returns the index of THEelement in an array that satisfies the provided testing function
      newGuesses[guesses.findIndex((element) => element == null)] =
        currentGuess;
      setGuesses(newGuesses);
      setCurrentGuess('');

      const isCorrect = solution === currentGuess;
      if (isCorrect) {
        // tehnically we dont need

        setGameOver(true);
      }
    }
    if (button === '{bksp}') {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }
    if (currentGuess.length >= 5) {
      return;
    }
    const isLetter = button.match(/^[a-z-żźćńółęąś]{1}$/) != null;
    if (isLetter) {
      setCurrentGuess((prev) => prev + button);
    }
  };

  return (
    <>
      {gameOver ? (
        <p className="p-4">
          CONGRATULATION, YOU WON!! The solution word is: {solution}
        </p>
      ) : null}

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
      <VirtualKeyboard
        onKeyPress={onKeyPress}
        guesses={guesses}
        solution={solution}
      />
      <button
        ref={buttonRef}
        onClick={startNewGame}
        className="focus:disabled p-2 mt-8 bg-gray-500 rounded-sm hover:bg-gray-600 z-30 relative transition duration-500 "
      >
        Start a new game
      </button>
      <button
        onClick={modalHandler}
        className="p-2 mt-8 bg-gray-500 rounded-sm hover:bg-gray-600 z-30 relative transition duration-500 "
      >
        How To Play
      </button>
      {showModal && <Modal modalHandler={modalHandler} />}
      <h2
        onClick={handleShowTheSolution}
        className="mt-8 p-2 rounded bg-gray-500 transition hover:bg-gray-600"
      >
        Solution:
      </h2>
      {showTheSolution ? <p className="py-4">{solution}</p> : null}

      {typoError && <TypoError currentGuess={currentGuess} />}

      {/* <input className='mt-8'
      ref={keyboardRef}
      ></input> */}
    </>
  );
}
