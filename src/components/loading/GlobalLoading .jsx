import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';
import { statusLoading } from 'features/slices/loading.slice';
import { useLottie } from 'lottie-react';
import animation_loading from '../../assets/json/animation_loading.json';
const GlobalLoading = () => {
  const isLoading = useSelector(statusLoading);
  const options = {
    animationData: animation_loading,
    loop: true
  };
  const { View } = useLottie(options);
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={isLoading}>
      {/* <CircularProgress color="inherit" /> */}
      {View}
    </Backdrop>
  );
};

export default GlobalLoading;
