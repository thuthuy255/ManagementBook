import { Grid } from '@mui/material';
import React from 'react';

import { BACKGROUND_PRIMARY } from 'constants/Color';
import BannerHome from './components/BannerHome';
import CategaryHome from './components/CategaryHome';
import './css/Home.css';
import ListProductsTopTrend from './components/ListProductsTopTrend';
export default function HomeProducts() {
  return (
    <Grid container style={{ backgroundColor: BACKGROUND_PRIMARY, minHeight: 'calc(100vh - 100px)' }} pt={3} pb={'60px'}>
      <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} item container px={2}>
        <BannerHome />
      </Grid>
      <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} item container>
        <CategaryHome />
      </Grid>
      <Grid className="backgroundActive" py={3} mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'} item container>
        <ListProductsTopTrend />
      </Grid>
    </Grid>
  );
}
