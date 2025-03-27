import { Grid } from '@mui/material';
import React from 'react';

import { BACKGROUND_PRIMARY } from 'constants/Color';
import BannerHome from './components/BannerHome';
import CategaryHome from './components/CategaryHome';
import './css/Home.css';
import ListProductsTopTrend from './components/ListProductsTopTrend';
import ListProducts from './components/ListProducts';
import imgProduct from '../../../assets/images/cart_img/Book1.jpg';
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
      <Grid container spacing={2} mt={2} justifyContent="center">
        <Grid item xs={6} sm={4} md={2}>
          <ListProducts
            image={imgProduct}
            title={'Thay Đổi Một Suy Nghĩ Thay Đổi Cả Cuộc Đời'}
            price={'104.000đ'}
            sale={'-35%'}
            oldPrice={'160.000 đ'}
            star={5}
            sold={231}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <ListProducts
            image={imgProduct}
            title={'Thay Đổi Một Suy Nghĩ Thay Đổi Cả Cuộc Đời'}
            price={'104.000đ'}
            sale={'-35%'}
            oldPrice={'160.000 đ'}
            star={5}
            sold={231}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <ListProducts
            image={imgProduct}
            title={'Thay Đổi Một Suy Nghĩ Thay Đổi Cả Cuộc Đời'}
            price={'104.000đ'}
            sale={'-35%'}
            oldPrice={'160.000 đ'}
            star={5}
            sold={231}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <ListProducts
            image={imgProduct}
            title={'Thay Đổi Một Suy Nghĩ Thay Đổi Cả Cuộc Đời'}
            price={'104.000đ'}
            sale={'-35%'}
            oldPrice={'160.000 đ'}
            star={5}
            sold={231}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <ListProducts
            image={imgProduct}
            title={'Thay Đổi Một Suy Nghĩ Thay Đổi Cả Cuộc Đời'}
            price={'104.000đ'}
            sale={'-35%'}
            oldPrice={'160.000 đ'}
            star={5}
            sold={231}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
