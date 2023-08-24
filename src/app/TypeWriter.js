import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, doType }) => {
  const [output, setOutput] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (doType) {
      setOutput('');
      setIndex(0);
    } else {
      setOutput(text);
      setIndex(text.length);
    }
  }, [text, doType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < text.length) {
        setOutput((prevOutput) => prevOutput + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, 30);

    return () => {
      clearTimeout(timer);
    };
  }, [index, text]);

  return <span>{output}</span>;
};

export default Typewriter;
