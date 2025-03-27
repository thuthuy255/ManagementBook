import { Box, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

function ListProducts({ image, title, price, sale, oldPrice, star, sold, slug }) {
  return (
    <Link to={`/DetailProducts/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Grid bgcolor={'white'} display="flex" flexDirection={'column'} gap={1} pt={1} minHeight={320} p={2}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={image} style={{ width: '125px', height: '125px', display: 'flex', justifyContent: 'center' }} />
        </div>
        <Typography
          sx={{
            padding: '5px',
            width: '100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden'
            // minHeight: '75px'
          }}
        >
          {title}
        </Typography>
        <Grid container alignItems={'center'} spacing={1} sx={{ padding: '5px' }}>
          <Grid item>
            <Typography sx={{ color: '#C42415', fontSize: '18px', fontWeight: 'bold' }}>{price}</Typography>
          </Grid>
          <Grid item>
            <div style={{ backgroundColor: '#C42415', padding: '3px', borderRadius: '5px' }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>{sale}</Typography>
            </div>
          </Grid>
        </Grid>
        <Typography
          sx={{
            textDecoration: 'line-through',
            color: 'gray',
            fontSize: '14px',
            paddingLeft: '5px'
          }}
        >
          {oldPrice}
        </Typography>
        <Grid container alignItems={'center'} sx={{ paddingX: '5px', paddingBottom: '5px' }}>
          <Grid item>
            {Array.from({ length: star }).map((_, index) => (
              <StarIcon key={index} sx={{ color: 'gold', fontSize: '16px' }} />
            ))}
          </Grid>
          <Typography sx={{ fontSize: '12px', color: 'gray', marginLeft: '5px' }}>
            ({star}) | Đã bán {sold}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

export default memo(ListProducts);
