import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetLogin } from 'features/slices/app.slice';
import ModalConfirm from 'components/modal/ModalConfirm';
import useMenu from 'hook/useMenu';
import { resetUserState } from 'features/slices/user.slice';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, [openModal]);
  const { handleClose } = useMenu();
  const handleConfirmLogout = useCallback(() => {
    dispatch(resetLogin());
    dispatch(resetUserState());
    handleClose();
    localStorage.removeItem('access_token');
  }, [dispatch]);
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 1} component={Link} to="/profile">
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleToggleModal}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <ModalConfirm open={openModal} onClose={handleConfirmLogout} onConfirm={handleConfirmLogout} loading={false} />
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
