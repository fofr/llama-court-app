import React, { useEffect, useState } from 'react';

const Typewriter = ({ text }) => {
  const [output, setOutput] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < text.length) {
        console.log("here!");

        setOutput(output + text[index]);
        setIndex(index + 1);
      }
    }, 20);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  return <span>{output}</span>;
};

export default Typewriter;
