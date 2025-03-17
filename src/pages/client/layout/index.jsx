import { Box, Paper, IconButton } from '@mui/material';
import { Outlet } from 'react-router';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useState, useEffect } from 'react';
import UserProvider from '../Provider/UserProvider';
import CategoryPage from '../category/CategoryPage';

export default function UserLayout() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <UserProvider>
      <Box sx={{ display: 'flex', height: '100vh', p: 2, gap: 2 }}>
        <Box sx={{ transition: 'all 0.3s', width: open ? '300px' : '0px', overflow: 'hidden' }}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              p: 2,
              borderRadius: 2,
              transition: 'all 0.3s',
              display: open ? 'block' : 'none'
            }}
          >
            <CategoryPage />
          </Paper>
        </Box>
        <Box sx={{ marginLeft: 5, flexGrow: 1, overflowY: 'auto', minWidth: 0 }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: 'absolute',
              left: open ? 280 : 10,
              top: 20,
              zIndex: 10,
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' },
              transition: 'all 0.3s',
              boxShadow: 2,
              width: 40,
              height: 40,
              borderRadius: '50%'
            }}
          >
            {open ? <KeyboardArrowLeft /> : <KeyboardArrowRightIcon />}
          </IconButton>
          <Outlet />
        </Box>
      </Box>
    </UserProvider>
  );
}
