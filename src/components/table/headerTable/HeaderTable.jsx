import { Box, Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useDebounce from 'hook/useDebounce';
function HeaderTable({
  searchTable,
  onAdd,
  onRemove,
  statusRemoveMultipleItems = true,
  statusAdd = true,
  showDropdown = false,
  dataDropdown = [],
  onChangeDropdown = () => {},
  dropdownLabel = 'Lọc theo',
  dropdownValue = ''
}) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    searchTable(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <Grid container rowSpacing={2} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-textarea"
          label="Tìm kiếm"
          placeholder="Nhập tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Chỉ lưu state, không gọi hàm ngay
        />
        {showDropdown && (
          <FormControl style={{ paddingLeft: 10 }}>
            <Select
              value={dropdownValue}
              label={dropdownLabel}
              onChange={(e) => onChangeDropdown(e.target.value)}
              style={{ minWidth: '200px' }}
              placeholder="Chọn trạng thái hiển thị"
            >
              {dataDropdown.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
        <Box display={'flex'} gap={2}>
          {statusAdd && (
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
          )}
          {statusRemoveMultipleItems && (
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
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(HeaderTable);
