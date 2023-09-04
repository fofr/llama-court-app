import React, { useEffect } from 'react';

export default function ThoughtBubble({ isPlaying, setDirection, text }) {
  useEffect(() => {
    if (!isPlaying) {
      return
    }
    const timer = setTimeout(() => setDirection("forward"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <div className={(isPlaying ? "fade-in " : "") + "bg-blue-300 p-2 m-2 rounded-lg relative bg-opacity-90"} style={{ animationDelay: '1s' }}>
        <p className="max-h-60 overflow-scroll">{text}</p>
      </div>
      <div className={(isPlaying ? "fade-in " : "") + "absolute -bottom-7 left-4 w-6 h-6 bg-blue-300 rounded-full bg-opacity-90"} style={{ animationDelay: '0.5s' }}></div>
      <div className={(isPlaying ? "fade-in " : "") + "absolute -bottom-11 left-9 w-4 h-4 bg-blue-300 rounded-full bg-opacity-90"} style={{ animationDelay: '0s' }}></div>
    </div>
  );
}
