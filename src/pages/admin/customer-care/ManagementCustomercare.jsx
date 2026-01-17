import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  styled
} from '@mui/material';
import { GetAllUser } from '../user/services/User.api';
import { getProducts, sendEmail } from 'services/clients/product';
import { showToast } from 'components/notification/CustomToast';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  paddingBottom: '-60px'
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  borderRadius: theme.spacing(1),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
  }
}));

const StyledCardMedia = styled(CardMedia)({
  width: '40%',
  objectFit: 'cover'
});

const StyledTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

const ScrollableBox = styled(Box)(({ theme }) => ({
  maxHeight: 'calc(100vh - 300px)',
  overflowY: 'auto',
  paddingRight: theme.spacing(1)
}));

export default function ManagementCustomercare() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productRes] = await Promise.all([GetAllUser(), getProducts()]);
        setCustomers(userRes.data.rows);
        setProducts(productRes.data.rows);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      showToast('Chủ đề và nội dung không được để trống', 'error');
      return;
    }
    setSending(true);
    try {
      const payload = { to: selectedCustomers, subject, message, products: selectedProducts };
      const response = await sendEmail(payload);
      response.err === 0 ? showToast(response.mess, 'success') : showToast(response.mess, 'error');
    } catch (error) {
      showToast('Gửi email thất bại', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <StyledContainer style={{ marginBottom: '-60px' }} maxWidth="lg">
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        📩 Gửi Email Khuyến Mãi
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <ScrollableBox>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', color: '#424242' }}>
                  Chọn khách hàng
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => setSelectedCustomers(e.target.checked ? customers.map((c) => c.email) : [])}
                      sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }}
                    />
                  }
                  label="Chọn tất cả"
                />
                <Autocomplete
                  multiple
                  options={customers}
                  getOptionLabel={(option) => `${option.name} (${option.email})`}
                  value={customers.filter((c) => selectedCustomers.includes(c.email))}
                  onChange={(_, newValue) => setSelectedCustomers(newValue.map((c) => c.email))}
                  renderInput={(params) => (
                    <TextField {...params} label="Tìm khách hàng" variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} />
                  )}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', color: '#424242' }}>
                Chọn sản phẩm
              </Typography>
              <Grid container spacing={2}>
                {products.map((product) => {
                  const images = typeof product.img_src === 'string' ? JSON.parse(product.img_src || '[]') : (product.img_src || []);
                  const imageUrl = images.length > 0 ? images[0] : 'https://via.placeholder.com/200';
                  return (
                    <Grid item xs={12} key={product.id}>
                      <StyledCard>
                        <StyledCardMedia component="img" image={imageUrl} alt={product.name} />
                        <CardContent sx={{ flex: 1 }}>
                          <StyledTypography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                            {product.name}
                          </StyledTypography>
                          <Typography variant="body2" color="text.secondary">
                            Giá: {product.price.toLocaleString()} VND
                          </Typography>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onChange={() =>
                                  setSelectedProducts((prev) =>
                                    prev.includes(product.id) ? prev.filter((p) => p !== product.id) : [...prev, product.id]
                                  )
                                }
                                sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }}
                              />
                            }
                            label="Chọn"
                          />
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  );
                })}
              </Grid>
            </ScrollableBox>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
              <TextField
                fullWidth
                label="Chủ đề"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Nội dung (Hỗ trợ Markdown)"
                variant="outlined"
                multiline
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 1 }}
                placeholder="Ví dụ: **Mã giảm giá 20%**: SALE20 - Áp dụng đến 30/3/2025"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={selectedCustomers.length === 0 || sending}
                onClick={handleSendEmail}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                  }
                }}
              >
                {sending ? <CircularProgress size={24} color="inherit" /> : 'Gửi Email'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
}
