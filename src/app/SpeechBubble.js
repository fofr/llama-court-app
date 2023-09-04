import Typewriter from './Typewriter';


export default function SpeechBubble({ isPlaying, setDirection, text }) {
  return (
    <div className="relative bg-white p-2 m-2">
      <p className="max-h-60 overflow-auto">
        <Typewriter isPlaying={isPlaying} setDirection={setDirection} text={text} />
      </p>
      <div style={{
        position: 'absolute', // Position the triangle relative to the bubble
        bottom: '-20px', // Shift the triangle to the bottom
        left: '20px', // Set the horizontal position of the triangle
        width: '0', // Width and height of 0 define a triangle
        height: '0',
        borderTop: '20px solid white', // Create the top of the triangle
        borderRight: '20px solid transparent', // Create the right side of the triangle
        borderLeft: '20px solid transparent', // Create the left side of the triangle
      }} />
    </div>
  );
}
