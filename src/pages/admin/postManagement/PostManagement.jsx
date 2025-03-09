import { Button, Grid } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ListPostManagement from './ListPostManagement';
import { Link } from 'react-router-dom';

export default function PostManagement() {
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quản lý bài viết</span>

        <Button
          component={Link}
          to="/add-post"
          size="small"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} // 🔥 Căn chỉnh icon và text đẹp hơn
        >
          <AddIcon />
          <span>Thêm mới</span>
        </Button>
      </Grid>
      <ListPostManagement />
    </div>
  );
}
