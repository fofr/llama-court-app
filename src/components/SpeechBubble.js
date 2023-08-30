import Typewriter from './TypeWriter';


export default function SpeechBubble({ doType, text }) {
  return (
    <div className="xl:text-base relative -left-10 -mr-10 bg-orange-100 rounded p-4">
      <p className="max-h-80 overflow-scroll">
        <Typewriter doType={doType} text={text} />
      </p>
      <div style={{
        position: 'absolute', // Position the triangle relative to the bubble
        top: '20px', // Shift the triangle to the top
        left: '-20px', // Set the horizontal position of the triangle
        width: '0', // Width and height of 0 define a triangle
        height: '0',
        borderRight: '20px solid #FFEDD5', // Create the right side of the triangle
        borderTop: '20px solid transparent', // Create the top of the triangle
        borderBottom: '20px solid transparent', // Create the bottom side of the triangle
      }} />
    </div>
  );
}
