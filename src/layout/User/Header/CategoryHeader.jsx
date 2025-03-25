import { Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';
import { setCategories } from 'features/slices/category.slice';
import { getAllCategoryQuery } from 'pages/admin/category/services/category.query';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function CategoryHeader({ anchorEl, open, handleClose }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 20,
    keyword: '',
    sort: 'desc'
  });
  const { data: dataCategory, isLoading: isLoadingCategory } = getAllCategoryQuery({ params: searchParams });

  useEffect(() => {
    if (dataCategory && dataCategory?.data?.rows) {
      dispatch(setCategories(dataCategory?.data?.rows));
    }
  }, [dataCategory]);
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <Box px={2} py={1}>
        <Typography variant="h5" gutterBottom mb={0}>
          Danh mục sản phẩm
        </Typography>
      </Box>
      {isLoadingCategory ? (
        <Loading />
      ) : (
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {dataCategory?.data?.rows?.map((item) => (
            <MenuItem key={item?.id} onClick={handleClose}>
              <Box display={'flex'} gap={1} width="250px">
                <img src={item.img} width={30} height={30} />
                <Tooltip title={item.type} placement="top">
                  <Box
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1
                    }}
                  >
                    {item?.type}
                  </Box>
                </Tooltip>
              </Box>
            </MenuItem>
          ))}
        </Box>
      )}
    </Menu>
  );
}

export default memo(CategoryHeader);
