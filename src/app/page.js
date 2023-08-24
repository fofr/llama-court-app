// pages/ChooseRoom.js
import Link from 'next/link';

const ChooseRoom = () => {
  return (
    <div>
      <h1>Choose a Courtroom</h1>
      <ul>
        <li>
          <Link href="/A">
            Courtroom A
          </Link>
        </li>
        <li>
          <Link href="/B">
            Courtroom B
          </Link>
        </li>
        <li>
          <Link href="/C">
            Courtroom C
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ChooseRoom;
