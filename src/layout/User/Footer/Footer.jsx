import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import React, { memo } from 'react';
import '../css/Footer.css';
import Logo from 'components/logo/LogoMain';
import Logo_BCT from "../../../assets/images/icons/logo_BCT.webp"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Logo_android from "../../../assets/images/icons/android1.webp"
import Logo_ios from "../../../assets/images/icons/appstore1.webp"
import HomeIcon from '@mui/icons-material/Home';
import Logo_lex from "../../../assets/images/icons/logo_lex.webp"
function Footer() {
  return <div>
    <Grid container sx={{ display: 'flex', alignItems: 'center' }} px={3} md={12} >
      <Grid item md={3} >
        <Logo />
        <Box mb={1} mt={1}>
          <Typography className='text_add'>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</Typography>
          <Typography className='text_add'>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</Typography>
          <Typography className='text_add'>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</Typography>
        </Box>
        <Box mb={1}>
          <Typography className='text_add'>
            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.
          </Typography>
          <Typography width={"80%"} className='text_add'>
            KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
          </Typography>
        </Box>
        <img src={Logo_BCT} width={100}></img>
        <Grid container spacing={3} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item>
            <FacebookIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </Grid>
          <Grid item>
            <InstagramIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </Grid>
          <Grid item>
            <YouTubeIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </Grid>
          <Grid item>
            <TwitterIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </Grid>
          <Grid item>
            <PinterestIcon sx={{ fontSize: 32, cursor: "pointer" }} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item>
            <img src={Logo_android} width={100} />
          </Grid>
          <Grid item>
            <img src={Logo_ios} width={100} />
          </Grid>
        </Grid>

      </Grid>
      {/* Đường kẻ dọc */}
      <Divider orientation="vertical" flexItem sx={{ mx: 2, backgroundColor: 'gray' }} />
      <Grid item md={8}>
        <Grid container ml={6} mr={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item>
            <Grid item>
              <Typography variant="h5" mb={1} >
                DỊCH VỤ
              </Typography>
              <Typography mb={2} >
                Điều khoản sử dụng
              </Typography>
              <Typography mb={2} >
                Chính sách bảo mật thông tin cá nhân
              </Typography>
              <Typography mb={2} >
                Chính sách bảo mật thanh toán
              </Typography>
              <Typography mb={2} >
                Giới thiệu Fahasa
              </Typography>
              <Typography mb={1} >
                Hệ thống trung tâm-nhà sách
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5" mb={1}>LIÊN HỆ</Typography>
              <Grid container alignItems="center" sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                <HomeIcon />
                <Typography sx={{ ml: 1 }}>
                  60-62 Lê Lợi, Q.1, TP. HCM
                </Typography>
              </Grid>

            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography variant="h5" mb={1} >
                HỖ TRỢ
              </Typography>
              <Typography mb={2} >
                Chính sách đổi-trả-hoàn tiền
              </Typography>
              <Typography mb={2} >
                Chính sách bảo hành-bồi hoàn
              </Typography>
              <Typography mb={2} >
                Chính sách vận chuyển
              </Typography>
              <Typography mb={9} >
                Chính sách khách sỉ
              </Typography>

            </Grid>
            <Grid item>

              <Grid container alignItems="center" sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                <HomeIcon />
                <Typography sx={{ ml: 1 }}>
                  cskh@fahasa.com.vn
                </Typography>
              </Grid>
            </Grid>


          </Grid>
          <Grid item>
            <Grid item>
              <Typography variant="h5" mb={1} >
                TÀI KHOẢN CỦA TÔI
              </Typography>
              <Typography mb={2} >
                Đăng nhập/Tạo tài khoản mới
              </Typography>
              <Typography mb={2} >
                Thay đổi địa chỉ khách hàng
              </Typography>
              <Typography mb={2} >
                Chi tiết tài khoản
              </Typography>
              <Typography mb={9} >
                Lịch sử mua hàng
              </Typography>

            </Grid>
            <Grid item>

              <Grid container alignItems="center" sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                <HomeIcon />
                <Typography sx={{ ml: 1 }}>
                  1900636467
                </Typography>
              </Grid>
            </Grid>


          </Grid>
        </Grid>
        <Grid container maxWidth={"90%"} spacing={10}
          sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>

        </Grid>
        <Grid container maxWidth={"90%"} spacing={10}
          sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
          <Grid item>
            <img src={Logo_lex} width={100}></img>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>;
}

export default memo(Footer);
