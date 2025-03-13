import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ListPostManagement from './ListPostManagement';
import { Link, useNavigate } from 'react-router-dom';
import HeaderTable from 'components/table/headerTable/HeaderTable';

export default function PostManagement() {
  const navigate = useNavigate();
  const handleSearchTable = useCallback((value) => {
    console.log('Đây là value', value);
  }, []);
  const handleNavigateAdd = useCallback(() => {
    navigate('/add-post');
  }, [navigate]);

  const handleRemoveMultipleItems = useCallback(() => {
    console.log('Xóa nhiều');
  }, [navigate]);
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
      </Grid>
      <ListPostManagement />
    </div>
  );
}
