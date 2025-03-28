import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
export default function Login() {
  useEffect(() => {
    console.log('Login Component Rendered!');
  }, []);
  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <ArrowBackIcon onClick={() => navigate('/')} />
              <Typography variant="h3">Đăng Nhập</Typography>
            </Box>

          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <Typography
              component={Link}
              to="/register"
              variant="body1"
              sx={{ textDecoration: 'none', textAlign: 'center' }}
              color="primary"
            >
              Bạn chưa có tài khoản?
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
