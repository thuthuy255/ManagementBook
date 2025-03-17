import { Typography, Box, Button } from '@mui/material';

export default function FilterLeft() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Bộ lọc sản phẩm
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" fullWidth>
          Áp dụng
        </Button>
      </Box>
    </Box>
  );
}
