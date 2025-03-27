import { Grid, Typography } from '@mui/material';
import React from 'react';
import './css/New.css';
import banner_top from '../../../assets/images/banner/banner_news.png';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { useParams } from 'react-router';

export default function DetailNews() {
  const { title } = useParams();
  return (
    <Grid container style={{ minHeight: 'calc(100vh - 100px)' }} display={'flex'} justifyContent={'center'} pt={1}>
      <Grid xs={11} md={11} lg={10} style={{ borderRadius: '20px' }}>
        <Typography variant="h5" color={BACKGROUND_DEFAULT} gutterBottom mb={0}>
          Trang chủ / Chi tiết
        </Typography>
        {/* <img src={banner_top} width={'100%'} height={'250px'} style={{ borderRadius: '20px', objectFit: 'cover' }} /> */}
        <Grid></Grid>
      </Grid>
    </Grid>
  );
}
