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
        py={2}
        whiteSpace="nowrap"
        sx={{
          maxWidth: '100%', // Không tràn ra ngoài
          overflowX: 'auto', // Cuộn ngang khi quá dài
          display: 'flex',
          flexWrap: 'nowrap', // Ngăn xuống dòng
          whiteSpace: 'nowrap' // Giữ nội dung trên một dòng
        }}
      >
        {listCategory?.map((item) => (
          <Link to={`/ListProducts?type=${item?.type}`}>
            <Grid
              item
              style={{ cursor: 'pointer' }}
              onClick={() => handleNavigateList(item.type)}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              className="Button_Hover"
              key={item?.id}
              md={2}
            >
              <Grid pb={1}>
                <img src={item.img} height={100} width={100} style={{ objectFit: 'contain' }} />
              </Grid>
              <Typography gutterBottom mb={0} textAlign={'center'}>
                {item.type}
              </Typography>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Grid>
  );
}

export default memo(CategaryHome);
