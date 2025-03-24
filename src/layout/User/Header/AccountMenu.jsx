import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import useMenu from 'hook/useMenu';
import React, { memo } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { InfoUserState } from 'features/slices/user.slice';

function AccountMenu() {
  const infoUser = useSelector(InfoUserState);
  console.log('🚀 ~ AccountMenu ~ infoUser:', infoUser);
  const { anchorEl, open, handleOpen, handleClose } = useMenu();
  return (
    <>
      <Tooltip title="Tài khoản" placement="top">
        <IconButton sx={{ color: '#fff' }} size="small" onClick={handleOpen}>
          <PersonIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {infoUser?.name ? (
          <>
            <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>Đăng nhập tài khoản</MenuItem>
          </>
        )}
        <MenuItem onClick={handleClose}>Thông tin hỗ trợ</MenuItem>
        <MenuItem onClick={handleClose}>Chính sách bảo mật</MenuItem>
        <MenuItem onClick={handleClose}>Điều khoản sử dụng</MenuItem>
      </Menu>
    </>
  );
}

export default memo(AccountMenu);
