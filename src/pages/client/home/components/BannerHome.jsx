import { Grid, Skeleton } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import Slider from 'react-slick';
import BannerTop from '../../../../assets/images/banner/banner_top.png';
import Banner from '../../../../assets/images/banner/banner_doc_quyen.png';
import Banner_1 from '../../../../assets/images/banner/banner_gian_hang_do_choi.png';
import Banner_2 from '../../../../assets/images/banner/banner_uu_dai.png';
import Banner_3 from '../../../../assets/images/banner/banner_hoi_sach.jpg';
import '../css/Home.css';
import { getAllBannerQuery } from 'pages/admin/banner/services/banner.query';
import { showToast } from 'components/notification/CustomToast';
import ToolsHome from './ToolsHome';
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
};
function BannerHome() {
  const listItemBanner = [Banner, Banner_1, Banner_2, Banner_3];
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 20,
    keyword: '',
    sort: 'asc',
    active: 1
  });
  const { data: dataBanner, isLoading: isLoading } = getAllBannerQuery({ params: searchParams });

  const handleUpdateBanner = useCallback(() => {
    showToast('Tính năng này đang được cập nhật', 'warning');
  }, []);
  return (
    <Grid container item spacing={1} md={10} xs={12}>
      <Grid item md={8}>
        {isLoading ? (
          <Skeleton style={{ borderRadius: '10px' }} variant="rectangular" width="100%" height={320} animation="wave" />
        ) : (
          <Slider {...settings}>
            {dataBanner?.data?.rows?.map((item) => (
              <img key={item?.id} src={item?.img} alt={item.name} className="image_bannner Button_Hover" />
            ))}
          </Slider>
        )}
      </Grid>
      <Grid container item md={4}>
        <Grid item md={12} height={'48%'} onClick={handleUpdateBanner} className="Button_Hover ImageBackgroud BannerRightTop"></Grid>
        <Grid item md={12} height={'48%'} onClick={handleUpdateBanner} className="Button_Hover ImageBackgroud BannerRightBottom"></Grid>
      </Grid>
      <Grid container item md={12} spacing={0.5} mt={0.5} display={'flex'} justifyContent={'space-between'}>
        {listItemBanner?.map((item, index) => (
          <Grid
            className="Button_Hover"
            item
            md={2.9}
            key={index}
            onClick={handleUpdateBanner}
            sx={{
              backgroundImage: `url(${item})`,
              backgroundSize: 'cover',
              borderRadius: '10px',
              height: 200
            }}
          ></Grid>
        ))}
      </Grid>
      <ToolsHome />
    </Grid>
  );
}

export default memo(BannerHome);
