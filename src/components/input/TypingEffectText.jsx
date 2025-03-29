import React, { useState, useEffect, useCallback, memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { BACKGROUND_DEFAULT } from 'constants/Color';

const TypingEffectInput = ({ text, speed = 100, delay = 1000, onDebouncedInput }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Tạo hiệu ứng gõ chữ cho placeholder
  const typeEffect = useCallback(() => {
    if (!isDeleting) {
      if (currentIndex < text.length) {
        setPlaceholder((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsDeleting(true);
      }
    } else {
      if (currentIndex > 0) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
      }
    }
  }, [currentIndex, isDeleting, text]);

  // Hiệu ứng gõ chữ chạy theo chu kỳ
  useEffect(() => {
    const intervalId = setInterval(typeEffect, speed);
    return () => clearInterval(intervalId);
  }, [typeEffect, speed]);

  useEffect(() => {
    if (currentIndex === text.length && !isDeleting) {
      const timeoutId = setTimeout(() => {
        setPlaceholder('');
        setCurrentIndex(0);
        setIsDeleting(false);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, isDeleting, text.length, delay]);

  // Debounce input (200ms delay)
  const debouncedHandleInput = useCallback(
    debounce((value) => {
      if (onDebouncedInput) onDebouncedInput(value);
    }, 500),
    [onDebouncedInput]
  );

  const handleChange = (event) => {
    setInputValue(event.target.value);
    debouncedHandleInput(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        sx: {
          bgcolor: 'white',
          borderRadius: '50px', // Bo tròn góc
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Hiệu ứng đổ bóng
          paddingRight: '14px', // Tạo khoảng cách cho icon
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent' // Ẩn viền
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d1d1d1'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a1a1a1'
          }
        },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ color: BACKGROUND_DEFAULT }} />
          </InputAdornment>
        )
      }}
    />
  );
};

export default memo(TypingEffectInput);
