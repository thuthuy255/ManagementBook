import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import useMenu from 'hook/useMenu';
import React, { memo, useCallback } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { InfoUserState, resetUserState } from 'features/slices/user.slice';
import { useNavigate } from 'react-router';
import { resetLogin } from 'features/slices/app.slice';

function AccountMenu() {
  const infoUser = useSelector(InfoUserState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { anchorEl, open, handleOpen, handleClose } = useMenu();
  const handleNavigateLogin = useCallback(() => {
    handleClose();
    navigate('/login');
  }, [handleClose]);

  const handleConfirmLogout = useCallback(() => {
    dispatch(resetLogin());
    dispatch(resetUserState());
    console.log('Zo');
    handleClose();
    navigate('/login');
    localStorage.removeItem('access_token');
  }, [dispatch]);

  return (
    <>
      <Tooltip title="Tài khoản" placement="top">
        <IconButton sx={{ color: '#fff' }} size="small" onClick={handleOpen}>
          <PersonIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {infoUser?.name ? (
          <Box>
            <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleNavigateLogin}>Đăng nhập tài khoản</MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleClose}>Thông tin hỗ trợ</MenuItem>
        <MenuItem onClick={handleClose}>Chính sách bảo mật</MenuItem>
        <MenuItem onClick={handleClose}>Điều khoản sử dụng</MenuItem>
        {infoUser?.name && <MenuItem onClick={handleConfirmLogout}>Đăng xuất</MenuItem>}
      </Menu>
    </>
  );
}

export default memo(AccountMenu);
