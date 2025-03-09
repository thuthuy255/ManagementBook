import React from 'react';
import ListPageBook from './ListPageBook';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
export default function PageBook() {
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quản lý sách</span>

        <Button
          component={Link}
          to="/add-book"
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

      {/* <div style={{ marginTop: "-20px" }}> */}
      <ListPageBook />

      {/* </div> */}
    </div>
  );
}
