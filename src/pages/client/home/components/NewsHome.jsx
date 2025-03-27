import { Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo, useCallback } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { getAllPostQuery } from '../services/new.query';
import Loading from 'components/loading/Loading';
import { getImage } from 'utils/getImage';
import { useNavigate } from 'react-router';
function NewsHome() {
  const { data: dataNews, isLoading } = getAllPostQuery({});
  const navigate = useNavigate();
  const handleNavigateDetail = useCallback((title) => {
    navigate(`/detail-news/${title}`);
  }, []);
  return (
    <Grid container item md={10} xs={12} sx={{ backgroundColor: BACKGROUND_WHITE }} borderRadius={'8px'}>
      <Grid
        item
        container
        md={12}
        display={'flex'}
        alignItems={'center '}
        px={2}
        style={{ background: 'linear-gradient(135deg, #FCDDEF, #FF6347)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
      >
        <NewspaperIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0} pt={2} pb={2} textAlign={'center'}>
          Tin mới nhất
        </Typography>
      </Grid>
      <Grid container>
        {isLoading ? (
          <Grid item md={12} height={'50vh'}>
            <Loading />
          </Grid>
        ) : (
          <Grid container p={3} spacing={1}>
            {dataNews?.data?.rows?.map((item) => (
              <Grid container onClick={() => handleNavigateDetail(item?.title)} item md={6} display={'flex'} className="Button_Hover">
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    backgroundImage: `url(${getImage(item)})`,
                    backgroundSize: 'cover', // hoặc 'cover' nếu muốn ảnh lấp đầy

                    backgroundRepeat: 'no-repeat',
                    // width: '120px',
                    height: '200px'
                  }}
                >
                  {/* <img src={getImage(item)} height={'200px'} width={'120px'} style={{ objectFit: 'contain' }} /> */}
                </Grid>
                <Grid item md={6} py={1}>
                  <Typography
                    ml={1}
                    variant="h5"
                    mb={0}
                    pt={1}
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden'
                    }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0}
                    pt={2}
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 5,
                      overflow: 'hidden'
                    }}
                  >
                    {item?.content}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default memo(NewsHome);
