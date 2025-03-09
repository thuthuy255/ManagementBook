import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Box, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const ModalConfirm = ({ open, onClose, onConfirm, title, content, loading }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2" color="">
          {title || 'Thông báo'}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content || 'Bạn có chắc chắn muốn thực hiện hành động này?'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" color="warning" onClick={onClose}>
            Hủy bỏ
          </Button>
          {loading ? (
            <Loading />
          ) : (
            <Button variant="contained" color="error" onClick={onConfirm}>
              Xác nhận
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

ModalConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool
};

export default React.memo(ModalConfirm);
