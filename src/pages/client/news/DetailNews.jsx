import { Grid, Typography } from '@mui/material';
import React from 'react';
import './css/New.css';
import banner_top from '../../../assets/images/banner/banner_news.png';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { useParams } from 'react-router';
import { getAllNewsQuery } from './services/new.query';
import Loading from 'components/loading/Loading';

export default function DetailNews() {
  const { title } = useParams();
  const { data: detailNews, isLoading } = getAllNewsQuery({
    params: {
      title: title
    }
  });
  console.log('🚀 ~ DetailNews ~ detailNews:', detailNews);
  return (
    <Grid container style={{ minHeight: 'calc(100vh - 100px)' }} display={'flex'} justifyContent={'center'} pt={1}>
      <Grid xs={11} md={11} lg={10} style={{ borderRadius: '20px' }}>
        <Typography variant="h5" color={BACKGROUND_DEFAULT} gutterBottom mb={0}>
          Trang chủ / Chi tiết
        </Typography>
        <img src="" />
        {isLoading ? (
          <Grid container height={'calc(50vh)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Loading />
          </Grid>
        ) : (
          <Grid></Grid>
        )}
      </Grid>
    </Grid>
  );
}
