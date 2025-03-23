import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import useMenu from 'hook/useMenu';
import React, { memo, useCallback } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { InfoUserState } from 'features/slices/user.slice';
import { useNavigate } from 'react-router';

function AccountMenu() {
  const infoUser = useSelector(InfoUserState);
  const navigate = useNavigate();
  console.log('🚀 ~ AccountMenu ~ infoUser:', infoUser);
  const { anchorEl, open, handleOpen, handleClose } = useMenu();
  const handleNavigateLogin = useCallback(() => {
    handleClose();
    navigate('/login');
  }, [handleClose]);
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
            <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleNavigateLogin}>Đăng nhập tài khoản</MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleClose}>Thông tin hỗ trợ</MenuItem>
        <MenuItem onClick={handleClose}>Chính sách bảo mật</MenuItem>
        <MenuItem onClick={handleClose}>Điều khoản sử dụng</MenuItem>
      </Menu>
    </>
  );
}

export default memo(AccountMenu);
