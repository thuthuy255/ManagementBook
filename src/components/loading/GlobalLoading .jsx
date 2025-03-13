import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { statusLoading } from 'features/slices/loading.slice';

const GlobalLoading = () => {
  const isLoading = useSelector(statusLoading);

  return (
    <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoading;
