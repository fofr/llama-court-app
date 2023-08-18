import Typewriter from './Typewriter';

export default function ThoughtBubble({ text }) {
  return (
    <div className="bg-blue-300 p-2 m-2 rounded-lg relative bg-opacity-80">
      <div className="absolute -bottom-7 left-4 w-6 h-6 bg-blue-300 rounded-full bg-opacity-80"></div>
      <div className="absolute -bottom-11 left-9 w-4 h-4 bg-blue-300 rounded-full bg-opacity-80"></div>
      <p><Typewriter text={text} /></p>
    </div>
  );
}
