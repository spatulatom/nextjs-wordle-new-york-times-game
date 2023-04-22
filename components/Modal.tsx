import React from 'react'
import Image from 'next/image';
type props = {
    modalHandler: any
}
export default function Modal({modalHandler}: props) {
  return (
    <div onClick={modalHandler} className='fixed z-50 bg-black top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
    <div className='relative'>
      <div className='absolute right-3 top-[-15px] border p-1' >CLOSE</div>
    <Image
    
    width={500}
    height={500}
    src="/ruless.png"
    alt="How to play"/>
    
    </div>
    </div>
  )
}
