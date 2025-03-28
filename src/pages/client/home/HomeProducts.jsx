import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

import { BACKGROUND_PRIMARY } from 'constants/Color';
import BannerHome from './components/BannerHome';
import CategaryHome from './components/CategaryHome';
import './css/Home.css';
import ListProductsTopTrend from './components/ListProductsTopTrend';
import ListProducts from './components/ListProducts';
import imgProduct from '../../../assets/images/cart_img/Book1.jpg';
import MyListProducts from './components/MyListProducts';
import NewsHome from './components/NewsHome';
import { useNavigate } from 'react-router';
export default function HomeProducts() {
  const navigate = useNavigate();
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

      <Grid py={3} mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'} item container>
        <MyListProducts />
        <Grid container pt={3} display={'flex'} justifyContent={'center'}>
          <Button
            onClick={() => navigate('/ListProducts')}
            variant="contained"
            sx={{
              backgroundColor: '#C12530',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#a81e28' // Màu tối hơn khi hover
              }
            }}
          >
            <Typography variant="h4" gutterBottom mb={0}>
              Xem thêm
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid py={3} mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'} item container>
        <NewsHome />
        <Grid container pt={3} display={'flex'} justifyContent={'center'}>
          <Button
            onClick={() => navigate('/list-news')}
            variant="contained"
            sx={{
              backgroundColor: '#C12530',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#a81e28' // Màu tối hơn khi hover
              }
            }}
          >
            <Typography variant="h4" gutterBottom mb={0}>
              Xem thêm
            </Typography>
          </Button>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2} mt={2} justifyContent="center">
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
      </Grid> */}
    </Grid>
  );
}
