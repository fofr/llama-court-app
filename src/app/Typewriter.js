import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, isPlaying, setDirection }) => {
  const [output, setOutput] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isPlaying && output != text) {
      setOutput('');
      setIndex(0);
    } else {
      setOutput(text);
      setIndex(text.length);
    }
  }, [text, isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return
    }
    const timer = setTimeout(() => {
      if (index < text.length) {
        setOutput((prevOutput) => prevOutput + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setDirection("forward");
      }
    }, 30);

    return () => {
      clearTimeout(timer);
    };
  }, [index, text]);

  return <span>{output}</span>;
};

export default Typewriter;
