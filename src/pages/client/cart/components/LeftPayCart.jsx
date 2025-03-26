import { Box, Button, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Logo_gift from '../../../../assets/images/cart_img/chose_gift_icon_image.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';
import { formatPrice } from 'utils/format';
function LeftPayCart({ count }) {
  console.log('🚀 ~ LeftPayCart ~ count:', count);
  return (
    <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Box sx={{ backgroundColor: '#fff' }}>
        <Grid container sx={{ justifyContent: 'space-between', padding: '10px;' }}>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <ConfirmationNumberIcon sx={{ color: '#2F80ED' }} />
            <Typography sx={{ color: '#2F80ED' }}>KHUYẾN MÃI</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Typography sx={{ color: '#2F80ED' }}>Xem thêm</Typography>
            <ArrowForwardIosIcon sx={{ color: '#2F80ED', width: '20px' }} />
          </Grid>
        </Grid>
        <hr
          width="98%"
          style={{
            border: 'none', // Loại bỏ viền mặc định
            borderTop: '1px solid #CED1D3', // Đặt màu cho đường kẻ
            backgroundColor: '#CED1D3', // Một số trình duyệt có thể cần cái này
            height: '1px' // Độ dày đường kẻ
          }}
        />
        <Grid sx={{ justifyContent: 'space-between', padding: '10px;' }}>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%' // Cần thiết để "space-between" hoạt động
            }}
          >
            <Typography sx={{ color: '#111', fontSize: '16px' }}>Mã giảm 10K - Toàn sàn</Typography>
            <InfoIcon sx={{ color: '#2F80ED' }} />
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Typography
              maxWidth={'62%'}
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '25px'
              }}
            >
              Đơn hàng từ 130K - Không bao gồm giá trị của các sản phẩm sau Manga, Ngoại Giao
            </Typography>
            {/* <ConfirmationNumberIcon sx={{ color: '#2F80ED' }} /> */}
          </Grid>
          <Typography>HSD: 31/03/2025</Typography>
          <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '60%',
                height: '8px',
                backgroundColor: '#B5D2F3',
                borderRadius: '10px'
              }}
            ></div>
            <Button
              sx={{
                backgroundColor: '#2F80ED',
                '&:hover': {
                  backgroundColor: '#2F80ED',
                  boxShadow: 'none'
                }
              }}
            >
              <Typography sx={{ color: '#fff' }}>Mua thêm</Typography>
            </Button>
          </Grid>
          <Typography sx={{ fontSize: '12px' }}>Mua thêm 130.000 đ</Typography>
          <hr
            width="98%"
            style={{
              border: 'none',
              borderTop: '1px solid #CED1D3',
              backgroundColor: '#CED1D3',
              height: '1px',
              marginTop: '10px'
            }}
          />
          <Grid item sx={{ display: 'flex' }}>
            <Typography
              maxWidth={'60%'}
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '25px',
                color: '#808485'
              }}
            >
              Có thể áp dụng đồng thời nhiều abcjkcgsdkg
            </Typography>
            <InfoIcon sx={{ color: '#808485' }} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ background: 'linear-gradient(to left, #F5F5F5,rgb(188, 202, 241))', padding: '10px' }}>
        <Grid container sx={{ justifyContent: 'space-between', padding: '10px;' }}>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <img src={Logo_gift} width={25} />
            <Typography sx={{ fontWeight: 'bold' }}>Nhận quà</Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Chọn quà</Typography>
            <ArrowForwardIosIcon sx={{ color: '#2F80ED', width: '20px' }} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
        <Grid sx={{ padding: '10px;' }}>
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '16px' }}>Thành tiền</Typography>
            <Typography sx={{ fontSize: '16px' }}>{formatPrice(count)}</Typography>
          </Grid>
          <hr
            width="98%"
            style={{
              border: 'none', // Loại bỏ viền mặc định
              borderTop: '1px solid #CED1D3', // Đặt màu cho đường kẻ
              backgroundColor: '#CED1D3', // Một số trình duyệt có thể cần cái này
              height: '1px' // Độ dày đường kẻ
            }}
          />
          <Grid item sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '17px' }}>Tổng Số Tiền (gồm VAT)</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#C92127' }}>{formatPrice(count)}</Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
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
          </Button>
        </Grid>
        <Typography sx={{ color: 'red' }}>(Giảm giá trên web chỉ áp dụng cho bán lẻ)</Typography>
      </Box>
    </Grid>
  );
}

export default memo(LeftPayCart);
