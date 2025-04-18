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
  const handleClauseNavigation = () => {
    navigate('/PageClause');
  };
  const handlePrivacyNavigation = () => {
    navigate('/PagePrivacy');
  };
  const handleInfoNavigation = () => {
    navigate('/PageInfo_support');
  };
  const handleProfileNavigation = () => {
    navigate('/Pageprofile');
  };

  const handleOrderNavigation = () => {
    navigate('/PageOrder');
  };
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
            <MenuItem onClick={handleProfileNavigation}>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleOrderNavigation}>Theo dõi đơn hàng</MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem onClick={handleNavigateLogin}>Đăng nhập tài khoản</MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleInfoNavigation}>Thông tin hỗ trợ</MenuItem>
        <MenuItem onClick={handlePrivacyNavigation}>Chính sách bảo mật</MenuItem>
        <MenuItem onClick={handleClauseNavigation}>Điều khoản sử dụng</MenuItem>
        {infoUser?.name && <MenuItem onClick={handleConfirmLogout}>Đăng xuất</MenuItem>}
      </Menu>
    </>
  );
}

export default memo(AccountMenu);
