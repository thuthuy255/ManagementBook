import { Box, Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo, useCallback } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import { useSelector } from 'react-redux';
import { getCategories } from 'features/slices/category.slice';
import { Link, useNavigate } from 'react-router-dom';
function CategaryHome() {
  const listCategory = useSelector(getCategories);
  const naivgate = useNavigate();
  const handleNavigateList = useCallback((type) => {
    naivgate(`/list-product?type=${type}`);
  }, []);
  return (
    <Grid container item borderRadius={'10px'} sx={{ backgroundColor: BACKGROUND_WHITE }} md={10} xs={12} mt={3} pb={1}>
      <Grid item md={12} borderBottom={0.5} borderColor={'#F1F3F4'} display={'flex'} alignItems={'center'} style={{ padding: '15px 20px' }}>
        <GridViewIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0}>
          Danh mục sản phẩm
        </Typography>
      </Grid>
      <Grid
        style={{ padding: '15px 20px' }}
        item
        md={12}
        overflow={'auto'}
        display={'flex'}
        justifyContent={'space-between'}
        py={2}
        whiteSpace="nowrap"
      >
        {listCategory?.map((item) => (
          <Grid
            style={{ cursor: 'pointer' }}
            onClick={() => handleNavigateList(item.type)}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            className="Button_Hover"
            key={item?.id}
          >
            <Grid pb={1}>
              <img src={item.img} height={100} width={100} style={{ objectFit: 'contain' }} />
            </Grid>
            <Typography gutterBottom mb={0} textAlign={'center'}>
              {item.type}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default memo(CategaryHome);
