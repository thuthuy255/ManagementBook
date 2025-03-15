import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import { useNavigate } from 'react-router';
import ListPageBanner from './ListPageBanner';

export default function BannerManagement() {
  const navigate = useNavigate();
  const handleSearchTable = useCallback((value) => {
    console.log('Đây là value', value);
  }, []);
  const handleNavigateAdd = useCallback(() => {
    navigate('/add-banner');
  }, [navigate]);

  const handleRemoveMultipleItems = useCallback(() => {
    console.log('Xóa nhiều');
  }, [navigate]);
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
      </Grid>
      <ListPageBanner />
    </div>
  );
}
