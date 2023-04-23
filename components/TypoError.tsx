import React from 'react'

type props ={
    currentGuess: string
}

export default function TypoError({currentGuess}:props) {
  return (
    <div className='fixed top-1/4 text-white px-4 py-2 bg-red-800 rounded-md mx-auto'>We're sorry, but {currentGuess} is not in a word list.</div>
  )
}
