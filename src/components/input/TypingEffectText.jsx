import React, { useState, useEffect, useCallback, memo } from 'react';

const TypingEffectText = ({ text, speed = 100, delay = 1000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const typeEffect = useCallback(() => {
    if (!isDeleting) {
      if (currentIndex < text.length) {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsDeleting(true);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
      }
    }
  }, [currentIndex, isDeleting, text]);

  useEffect(() => {
    const intervalId = setInterval(typeEffect, speed);
    return () => clearInterval(intervalId);
  }, [typeEffect, speed]);

  useEffect(() => {
    if (currentIndex === text.length && !isDeleting) {
      const timeoutId = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex(0);
        setIsDeleting(false);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, isDeleting, text.length, delay]);

  return <span style={{ color: 'gray', lineHeight: '25px' }}>{currentText}</span>;
};

export default memo(TypingEffectText);
