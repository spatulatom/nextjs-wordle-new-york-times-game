import { useRef } from "react";


type props = {
    guess: any;
    isGuessSubmitted: any;
    solution: string;
  };
  
  export default function Line({ guess, isGuessSubmitted, solution }: props) {
    const refrence:any = useRef(null)
    const WORD_LENGTH = 5;
    //   this will be array of 5 divs and since its array of div no need to map over
    // it - remeber map() accutally returns an array of JSX elements
    const tiles = [];
  
    // if guess is null it will be turned into empty string '' on props: guess?? ''so
    // for loop can loop through ''[0], ''[1]... and not null[0], null[1]
    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = guess[i];
      
      // console.log('hrtr', char) // when char ='' this code will evalute to undefinded
      
      let tile = 'bg-black';
      if (isGuessSubmitted) {
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
      refrence.current 
      console.log('REFRENCE', refrence.current );
      
      
      tiles.push(
        <div
        ref={refrence}
          key={i}
          className={`${tile} w-16 h-16 border flex justify-center items-center uppercase text-xl`}
          tabIndex={i}
        >
          {char}
        </div>
      );
    }
  
    return <div className="flex gap-2 mb-3">{tiles}</div>;
  }