import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const ModalConfirm = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title || 'Thông báo'}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content || 'Bạn có chắc chắn muốn thực hiện hành động này?'}
        </Typography>
      </Box>
      <Box sx={{ display: flex, justifyContent: 'space-between' }}>
        <Button onClick={onConfirm}>
          <Typography>Hủy bỏ</Typography>
        </Button>
        <Button>
          <Typography>Xác nhận</Typography>
        </Button>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalConfirm);
