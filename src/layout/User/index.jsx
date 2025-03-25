import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import Header from './Header/Header';
import { useGetMenuMaster } from 'api/menu';
import Footer from './Footer/Footer';

// ==============================|| MAIN LAYOUT ||============================== //

export default function UserLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ width: '100%' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, pb: { xs: 2, sm: 3 } }}>
        {/* <Toolbar /> */}
        {/* <Box>
          <Breadcrumbs navigation={navigation} title />
        </Box> */}
        {/* <Box paddingBottom={'60px'} sx={{ overflowY: 'auto', flexGrow: 1 }}> */}
        <Outlet />
        {/* </Box> */}
      </Box>
      <Footer />
    </Box>
  );
}
