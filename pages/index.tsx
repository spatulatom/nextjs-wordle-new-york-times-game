import Image from 'next/image';
import { Inter } from 'next/font/google';
import Game from '@/components/Game';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-evenly font-mono text-sm ">
        <p className="fixed font-extrabold font-serif text-2xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-5 pt-5 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Wordle
       
        </p>

        <Game />
        <a
            href="https://www.nytimes.com/games/wordle/index.html"
            target="_blank"
            className="font-mono font-bold mt-20"
          >
            * Click here to see the original game here on NY Times website.
          </a>

        {/* <div className="flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black ">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>
    </main>
  );
}
