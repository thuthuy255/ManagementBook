import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import React, { memo, useState } from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { formatPrice } from 'utils/format';
import { discountAdd, vnPay } from 'services/clients/product';
import { showToast } from 'components/notification/CustomToast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';

function LeftPayCart({ count }) {
  const [discountCode, setDiscountCode] = useState('');
  const [discountData, setDiscountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleApplyDiscount = async () => {
    try {
      const response = await discountAdd({ discountCode });
      const { err, mess, data } = response;
      err === 0 ? showToast(mess, 'success') : showToast(mess, 'error');
      setDiscountData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckout = async () => {
    if (!user?.address) {
      showToast('Vui lòng cập nhật địa chỉ trước khi thanh toán!', 'error');
      navigate('/Pageprofile');
      return;
    }
    try {
      setLoading(true);
      const response = await vnPay({ discountCode });
      const { err, mess, vnpUrl } = response;
      err === 0 ? showToast(mess, 'success') : showToast(mess, 'error');
      err === 0 ? (window.location.href = vnpUrl) : '';
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid style={{ height: '100vh' }} item md={4} sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box sx={{ backgroundColor: '#fff', padding: '10px' }}>
        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <ConfirmationNumberIcon sx={{ color: '#2F80ED' }} />
            <Typography sx={{ color: '#2F80ED' }}>KHUYẾN MÃI</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginTop: '10px' }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" sx={{ height: '100%' }} onClick={handleApplyDiscount}>
              Áp dụng
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
        <Grid sx={{ padding: '10px;' }}>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '16px' }}>Thành tiền</Typography>
            {discountData ? (
              <Typography sx={{ fontSize: '16px', textDecoration: 'line-through', color: 'gray' }}>
                {formatPrice(discountData.originalPrice)}
              </Typography>
            ) : (
              <Typography sx={{ fontSize: '16px' }}>{formatPrice(count)}</Typography>
            )}
          </Grid>
          {discountData && (
            <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '16px', color: 'green' }}>Tiết kiệm</Typography>
              <Typography sx={{ fontSize: '16px', color: 'green' }}>-{formatPrice(discountData.discountAmount)}</Typography>
            </Grid>
          )}
          <hr
            width="98%"
            style={{
              border: 'none',
              borderTop: '1px solid #CED1D3',
              backgroundColor: '#CED1D3',
              height: '1px'
            }}
          />
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px' }}>Tổng Số Tiền (gồm VAT)</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#C92127' }}>
              {formatPrice(discountData ? discountData.finalPrice : count)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <LoadingButton
            loading={loading}
            onClick={handleCheckout}
            sx={{
              width: '100%',
              padding: '10px',
              backgroundColor: count >= 1 ? '#2F80ED' : '#ccc',
              color: '#fff',
              '&:hover': {
                backgroundColor: count >= 1 ? '#2F80ED' : '#ccc',
                boxShadow: 'none'
              },
              cursor: count >= 1 ? 'pointer' : 'not-allowed'
            }}
            disabled={count < 1}
          >
            <Typography>THANH TOÁN</Typography>
          </LoadingButton>
        </Grid>
        <Typography sx={{ color: 'red' }}>(Giảm giá trên web chỉ áp dụng cho bán lẻ)</Typography>
      </Box>
    </Grid>
  );
}

export default memo(LeftPayCart);
