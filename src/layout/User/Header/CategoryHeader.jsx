import { Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { getAllCategoryQuery } from 'pages/admin/category/services/category.query';
import React, { memo, useState } from 'react';

function CategoryHeader({ anchorEl, open, handleClose }) {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    sort: 'desc'
  });
  //   const { data: dataCategory, isLoading: isLoadingCategory } = getAllCategoryQuery({ params: searchParams });
  const listCategory = [
    {
      id: 1,
      name: 'Sách giáo khoa',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 2,
      name: 'Sách trí tuệ',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 3,
      name: 'Sách khoa học',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 4,
      name: 'Sách giáo dục',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 5,
      name: 'Cái tên dài kinh khủng khiếp ui trùi ui má ơi',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 6,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 7,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 8,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 9,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 10,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    },
    {
      id: 11,
      name: 'Sách độc đáo',
      icon: 'https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_foreignbooks.svg'
    }
  ];
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <Box px={2} py={1}>
        <Typography variant="h5" gutterBottom mb={0}>
          Danh mục sản phẩm
        </Typography>
      </Box>
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
        {listCategory?.map((item) => (
          <MenuItem key={item?.id} onClick={handleClose}>
            <Box display={'flex'} gap={1} width="250px">
              <img src={item.icon} width={30} height={30} />
              <Tooltip title={item.name} placement="top">
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1
                  }}
                >
                  {item?.name}
                </Box>
              </Tooltip>
            </Box>
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
}

export default memo(CategoryHeader);
