import { Button, Grid, IconButton } from '@mui/material';
import React, { memo } from 'react';
import Logo from 'components/logo/LogoMain';
import '../css/Header.css';
import GridViewIcon from '@mui/icons-material/GridView';
import TypingEffectText from 'components/input/TypingEffectText';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
function Header() {
  return (
    <Grid container className="container-header" sx={{ display: 'flex', alignItems: 'center' }} px={3} md={12} style={{ height: '100px' }}>
      <Grid item md={3}>
        <Logo />
      </Grid>
      <Grid item md={6} className="content-header">
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: '#fff' }} size="small">
            <GridViewIcon />
          </IconButton>
          <Button className="btnSearch">
            <Grid style={{ minWidth: '300px' }}>
              <TypingEffectText text="Tìm kiếm cuốn sách yêu thích của bạn" speed={100} delay={1500} />
            </Grid>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid item md={3} className="icon_menu">
        <IconButton size="small">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton size="small">
          <PersonIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default memo(Header);
