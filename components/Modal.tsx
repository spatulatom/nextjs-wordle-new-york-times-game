import React from 'react';
import Image from 'next/image';
type props = {
  modalHandler: () => void;
};
export default function Modal({ modalHandler }: props) {
  return (
    <div
      onClick={modalHandler}
      className="fixed z-50 bg-gray-500 bg-opacity-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-51 bg-black"
      >
        <div
          onClick={modalHandler}
          className="absolute right-3 top-1 border p-1"
        >
          CLOSE
        </div>
        <Image width={500} height={500} src="/ruless.png" alt="How to play" />
      </div>
    </div>
  );
}
