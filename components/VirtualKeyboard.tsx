import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

type props = {
  onKeyPress: (e: string) => void;
  guesses: string[];
  solution: string;
};

export default function VirtualKeyboard({
  onKeyPress,
  guesses,
  solution,
}: props) {
  let greens: string[] = [];
  let yellows: string[] = [];
  const grays: string[] = [];
  const WORD_LENGTH = 5;
  console.log('GUESSES', guesses);

  guesses.map((guess) => {
    console.log('LOOP1');
    if (guess == null) {
      return (guess = '');
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = guess[i];
      if (char === solution[i]) {
        console.log('loop2');
        // const neeGreen = [...greens]
        // neeGreen.push(char)
        greens = [...greens, char];
        if (yellows.includes(char)) {
          console.log('hereEEEEE', char);

          // const newArray = yellows.filter((letter: any) => {
          //   return letter !== char;
          // });
          yellows = [
            ...yellows.filter((letter: string) => {
              return letter !== char;
            }),
          ];
        }
      } else if (solution.includes(char)) {
        console.log('LOOP3');
        if (greens.includes(char)) {
          return;
        } else {
          yellows.push(char);
        }
      } else {
        console.log('LOOP4');
        grays.push(char);
      }
    }
  });

  let q = 'q';
  const themes = [
    {
      class: 'hg-green',
      buttons: '',
    },
    {
      class: 'hg-yellow',
      buttons: '  ',
    },
    {
      class: 'hg-gray',
      buttons: '   ',
    },
  ];
  //   const newGuess = guess.split('').join(' ');
  console.log('greens', greens, 'yellows', yellows);
  themes[0].buttons = greens.join(' ');
  themes[1].buttons = yellows.join(' ');
  themes[2].buttons = grays.join(' ');

  return (
    <div className="text-black mt-6 px-2 w-screen md:w-8/12">
      <Keyboard
        layoutName="default"
        //   onChange={onChange}
        onKeyPress={onKeyPress}
        layout={{
          default: [
            'ą ć ę ł ń ó ś ź ż',
            `${q} w e r t y u i o p`,
            'a s d f g h j k',
            'z x c v b n m l',
            '{enter} {bksp}',
          ],
          shift: [
            '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M < > ? {shift}',
            '.com @ {space}',
          ],
        }}
        buttonTheme={themes}
      />
    </div>
  );
}
