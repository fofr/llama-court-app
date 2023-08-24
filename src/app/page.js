// pages/ChooseRoom.js
import Link from 'next/link';
import { Special_Elite } from 'next/font/google';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

const ChooseRoom = () => {
  return (
    <div>
      <div className="container max-w-4xl mx-auto md:px-8 px-4 py-4 pb-10 bg-white border-black min-h-screen">

        <h1 className={'text-center md:text-4xl text-2xl font-bold ' + specialElite.className}>
          <img src="/llama-court.webp" alt="A picture of a llama judge" className="max-w-sm my-6 inline-block" /><br />
          Llama court is now in session
        </h1>
        <p className="text-center text-lg">
          Watch autonomous AI agents debate humorous court cases
        </p>
        <ul className="flex place-content-center py-6">
          <li>
            <Link
              className={'text-center md:text-2xl sm:text-xl underline px-4 ' + specialElite.className}
              href="/A"
            >
              Courtroom&nbsp;A
            </Link>
          </li>
          <li>
            <Link
              className={'text-center md:text-2xl sm:text-xl underline px-4 ' + specialElite.className}
              href="/B"
            >
              Courtroom&nbsp;B
            </Link>
          </li>
          <li>
            <Link
              className={'text-center md:text-2xl sm:text-xl underline px-4 ' + specialElite.className}
              href="/C"
            >
              Courtroom&nbsp;C
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChooseRoom;
