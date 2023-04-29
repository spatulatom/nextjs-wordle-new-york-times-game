import { ReactElement } from "react";

type props = {
  guess: string;
  isGuessSubmitted: boolean;
  solution: string;
};

export default function Line({ guess, isGuessSubmitted, solution }: props) {
  const WORD_LENGTH = 5;
  //   this will be array of 5 divs and since its array of div no need to map over
  // it - remeber map() accutally returns an array of JSX elements
  let tiles: ReactElement[] = [];


  // if guess is null it will be turned into empty string '' on props: guess?? ''so
  // for loop can loop through ''[0], ''[1]... and not null[0], null[1]
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];

    // console.log('hrtr', char) 
    // when char ='' this code will evalute to undefinded

    let tile = 'bg-gray-800';
    if (isGuessSubmitted) {
      if (char === solution[i]) {
        tile = 'bg-green-400';
      } else if (solution.includes(char)) {
        tile = 'bg-yellow-500';
      } else {
        tile = 'bg-gray-400';
      }
    }

  // not muttable update as oppose to tiles.push(div here)
   tiles = [...tiles, (
      <div
        key={i}
        className={`${tile} w-12 h-12 border flex justify-center items-center uppercase text-xl`}
        tabIndex={i}
      >
        {char}
      </div>
    )]
  }

  return (
    <>
      <div className="flex gap-2 mb-3">{tiles}</div>
    </>
  );
}
