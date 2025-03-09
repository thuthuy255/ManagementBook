import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function ButtonAction({ item, onEdit, onDelete }) {
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '5px' }}>
      <IconButton color="primary" size="small" onClick={onEdit.bind(null, item)}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" size="small" onClick={onDelete.bind(null, item)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
ButtonAction.propTypes = {
  item: PropTypes.object.isRequired, // Dữ liệu hàng được truyền vào
  onEdit: PropTypes.func.isRequired, // Hàm xử lý khi click sửa
  onDelete: PropTypes.func.isRequired // Hàm xử lý khi click xóa
};
export default memo(ButtonAction);
