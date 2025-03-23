import { Box, Paper, IconButton, Fade } from '@mui/material';
import { Outlet } from 'react-router';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useState, useEffect } from 'react';
import UserProvider from '../Provider/UserProvider';
import CategoryPage from '../category/CategoryPage';

export default function UserLayout() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <UserProvider>
      <Box sx={{ display: 'flex', height: '100vh', position: 'relative', bgcolor: '#f9f9f9',gap: 2 }}>
        {/* Sidebar */}
        <Paper
          elevation={1}
          sx={{
            width: '280px',
            height: '100%',
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            position: 'absolute',
            zIndex: 3,
            bgcolor: '#ffffff',
            border: '1px solid #e0e0e0',
            transform: open ? 'translateX(0)' : 'translateX(-300px)',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <CategoryPage />

          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' },
              transition: 'all 0.3s',
              width: 40,
              height: 40,
              borderRadius: '50%'
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Paper>
        <Box
          sx={{
            flexGrow: 1,
            ml: open ? '300px' : '20px',
            overflowY: 'auto',
            transition: 'all 0.3s ease',
            zIndex: 1
          }}
        >
          <Outlet />
        </Box>

        {!open && (
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: 'fixed',
              left: 20,
              bottom: 20,
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' },
              transition: 'all 0.3s',
              width: 40,
              height: 40,
              borderRadius: '50%',
              zIndex: 4
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
      </Box>
    </UserProvider>
  );
}
