import { Box, Button, Grid, TextField } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useDebounce from 'hook/useDebounce';
function HeaderTable({ searchTable, onAdd, onRemove }) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    searchTable(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <Grid container rowSpacing={2} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-textarea"
          label="Tìm kiếm"
          placeholder="Nhập tìm kiếm"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Chỉ lưu state, không gọi hàm ngay
        />
      </Grid>
      <Grid item xs={12} md={8} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
        <Box display={'flex'} gap={2}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: '35px' }}
            onClick={onAdd}
          >
            <AddIcon />
            <span>Thêm mới</span>
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: '35px' }}
            onClick={onRemove}
          >
            <DeleteIcon />
            <span>Xóa đã chọn</span>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(HeaderTable);
