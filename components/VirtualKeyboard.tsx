import React from 'react'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

type props = {
    onKeyPress: any
    guesses: string|null[]
}

export default function VirtualKeyboard({onKeyPress, guesses}:props) {

    
  return (
    <div className="text-black mt-6 w-screen md:w-6/12">
    <Keyboard
      layoutName="default"
    //   onChange={onChange}
      onKeyPress={onKeyPress}
      layout={{
        default: [
          'q w e r t y u i o p',
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
      buttonTheme={[
        {
          class: "hg-green",
          buttons: "Q W E R T Y q w e r t y"
        },
        {
          class: "hg-yellow",
          buttons: "m l"
        },
        {
          class: "hg-red",
          buttons: "k"
        }
      ]}
      
    />
  </div>

  )
}
