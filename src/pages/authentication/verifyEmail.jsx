import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthVerifyEmail from './auth-forms/AuthVerifyEmail';
import AuthWrapper from './AuthWrapper';

export default function VerifyEmail() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Nhập OTP Email</Typography>
            <Typography component={Link} to="/" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Quay lại đăng nhập
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthVerifyEmail />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
