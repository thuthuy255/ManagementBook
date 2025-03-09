import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';

function Loading() {
  return <CircularProgress />;
}

export default memo(Loading);
