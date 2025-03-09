import React, { memo, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

const CountdownTimer = ({ initialTime = 300, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const handleResendClick = () => {
    onResend();
    setTimeLeft(initialTime);
    setIsCounting(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Typography variant="body2" color="textSecondary">
        {isCounting ? `Gửi lại mã sau: ${minutes}:${seconds.toString().padStart(2, '0')}` : 'Bạn có thể gửi lại mã OTP ngay bây giờ.'}
      </Typography>
      <Button fullWidth size="large" variant="outlined" color="primary" onClick={handleResendClick} disabled={isCounting}>
        Gửi lại mã OTP
      </Button>
    </div>
  );
};

export default memo(CountdownTimer);
