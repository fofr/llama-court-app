export default function ThoughtBubble({ doFade, text }) {
  return (
    <div className="xl:text-base relative">
      <div className={(doFade ? "fade-in " : "") + "bg-blue-300 -left-10 -mr-10 p-4 rounded relative max-h-80 overflow-scroll"} style={{ animationDelay: '1s' }}>
        <p>{text}</p>
      </div>
      <div className="absolute top-0 -left-10">
        <div className={(doFade ? "fade-in " : "") + "absolute top-5 -left-8 w-6 h-6 bg-blue-300 rounded-full drop-shadow-lg"} style={{ animationDelay: '0.5s' }}></div>
        <div className={(doFade ? "fade-in " : "") + "absolute top-10 -left-12 w-4 h-4 bg-blue-300 rounded-full drop-shadow-lg"} style={{ animationDelay: '0s' }}></div>
      </div>
    </div>
  );
}
