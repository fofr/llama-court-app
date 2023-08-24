export default function ThoughtBubble({ doFade, text }) {
  return (
    <div>
      <div className={(doFade ? "fade-in " : "") + "bg-blue-300 p-2 m-2 rounded-lg relative bg-opacity-80"} style={{ animationDelay: '1s' }}>
        <p>{text}</p>
      </div>
      <div className={(doFade ? "fade-in " : "") + "absolute -bottom-7 left-4 w-6 h-6 bg-blue-300 rounded-full bg-opacity-80"} style={{ animationDelay: '0.5s' }}></div>
      <div className={(doFade ? "fade-in " : "") + "absolute -bottom-11 left-9 w-4 h-4 bg-blue-300 rounded-full bg-opacity-80"} style={{ animationDelay: '0s' }}></div>
    </div>
  );
}
