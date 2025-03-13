import React, { useCallback } from 'react';
import ListPageBook from './ListPageBook';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderTable from 'components/table/headerTable/HeaderTable';
export default function PageBook() {
  const navigate = useNavigate();
  const handleSearchTable = useCallback((value) => {
    console.log('Đây là value', value);
  }, []);
  const handleNavigateAdd = useCallback(() => {
    navigate('/add-book');
  }, [navigate]);

  const handleRemoveMultipleItems = useCallback(() => {
    console.log('Xóa nhiều');
  }, [navigate]);

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
      </Grid>
      <ListPageBook />
    </div>
  );
}
