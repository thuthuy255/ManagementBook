import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import React from 'react';
import './css/New.css';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { useParams } from 'react-router';
import { getAllNewsQuery } from './services/new.query';
import Loading from 'components/loading/Loading';
import { getImage } from 'utils/getImage';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { formatDate } from 'utils/format/FormatDate';
import { Link } from 'react-router-dom';

export default function DetailNews() {
  const { title } = useParams();
  const { data: detailNews, isLoading } = getAllNewsQuery({
    params: { title }
  });

  return (
    <Grid container style={{ minHeight: 'calc(100vh - 100px)', backgroundColor: '#f5f5f5', paddingTop: '20px' }} justifyContent={'center'}>
      <Grid item xs={11} md={10} lg={8}>
        <Link to={'/'}>
          <Typography variant="h6" color={BACKGROUND_DEFAULT} gutterBottom>
            Trang chủ / Chi tiết tin tức
          </Typography>
        </Link>
        {isLoading ? (
          <Grid container height={'calc(50vh)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Loading />
          </Grid>
        ) : (
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              perspective: '1000px',
              '&:hover': {
                transform: 'rotate3d(1, 1, 0, 5deg)',
                boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <CardMedia
              component="img"
              height="350"
              image={getImage(detailNews?.data?.rows[0])}
              alt="news-banner"
              sx={{
                objectFit: 'cover',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                transform: 'translateZ(0px)',
                '&:hover': {
                  opacity: 0.9,
                  transform: 'translateZ(20px)'
                }
              }}
            />
            <CardContent>
              <Typography variant="h4" color={BACKGROUND_DEFAULT} gutterBottom fontWeight={600}>
                {detailNews?.data?.rows[0]?.title}
              </Typography>
              <Grid container alignItems="center" spacing={1} mb={2}>
                <Grid item>
                  <DateRangeIcon sx={{ color: BACKGROUND_DEFAULT }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6" color={BACKGROUND_DEFAULT}>
                    {formatDate(detailNews?.data?.rows[0]?.updatedAt)}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" color="text.secondary" lineHeight={1.8}>
                {detailNews?.data?.rows[0]?.content}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
