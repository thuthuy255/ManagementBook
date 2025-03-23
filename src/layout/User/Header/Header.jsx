import { Box, Button, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { memo, useState } from 'react';
import Logo from 'components/logo/LogoMain';
import '../css/Header.css';
import GridViewIcon from '@mui/icons-material/GridView';
import TypingEffectText from 'components/input/TypingEffectText';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import ButtonFullScreen from 'components/button/ButtonFullScreen';
import AccountMenu from './AccountMenu';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      className="container-header"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      px={3}
      style={{ height: '100px' }}
    >
      <Grid item>
        <Link to="/">
          <Logo />
        </Link>
      </Grid>

      <Grid item xs={12} md={6} className="content-header">
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              '&:hover, &:focus, &:active': {
                backgroundColor: 'inherit', // Không đổi màu nền
                color: 'inherit', // Không đổi màu chữ
                boxShadow: 'none', // Không hiệu ứng bóng
                outline: 'none' // Không viền focus
              }
            }}
          >
            <Box pr={2} display={'flex'} alignItems={'center'} sx={{ color: '#fff' }}>
              <GridViewIcon fontSize="large" />
              <ArrowDropDownIcon />
            </Box>
          </Button>
          <Button className="btnSearch">
            <Grid style={{ width: '100%' }}>
              <TypingEffectText text="Tìm kiếm cuốn sách yêu thích của bạn" speed={100} delay={1500} />
            </Grid>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid item md={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }} className="icon_menu">
        <ButtonFullScreen />
        <Tooltip title="Thông báo" placement="top">
          <IconButton sx={{ color: '#fff' }} size="small">
            <NotificationsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Giỏ hàng" placement="top">
          <IconButton sx={{ color: '#fff' }} size="small">
            <AddShoppingCartIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <AccountMenu />
      </Grid>
      <CategoryHeader anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </Grid>
  );
}

export default memo(Header);
