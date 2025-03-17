import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', pt: 10 }}>
      <Typography variant="h2" color="error">
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Ôi dồi ôi! Trang này không tồn tại rồi 😢
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>
        Về trang chủ
      </Button>
    </Box>
  );
}
