import React from 'react';
import { getAllNewsQuery } from './services/new.query';
import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Loading from 'components/loading/Loading';
import { getImage } from 'utils/getImage';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { Link as RouterLink } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid #ddd',
  paddingY: 2,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[3],
    cursor: 'pointer'
  }
}));

export default function ListNews() {
  const { data: dataListNews, isLoading } = getAllNewsQuery({});

  return (
    <Grid container spacing={3} padding={3}>
      {isLoading ? (
        <Grid height={'calc(50vh)'} display={'flex'} justifyContent={'center'} alignItems={'center'} width="100%">
          <Loading />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Link component={RouterLink} to={'/'} underline="none">
            <Typography variant="h6" color={BACKGROUND_DEFAULT} gutterBottom>
              Trang chủ / Danh sách tin tức
            </Typography>
          </Link>
          <List>
            {dataListNews?.data?.rows?.map((item, index) => (
              <Link component={RouterLink} to={`/detail-news/${item?.title}`} style={{ textDecoration: 'none' }} key={item?.id}>
                <StyledListItem alignItems="flex-start">
                  <ListItemAvatar style={{ paddingRight: '20px' }}>
                    <Avatar
                      variant="rounded"
                      src={getImage(item)}
                      sx={{ width: 120, height: 120, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.1)' } }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          fontWeight: 'bold'
                        }}
                      >
                        {item?.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden'
                        }}
                      >
                        {item?.content}
                      </Typography>
                    }
                  />
                </StyledListItem>
              </Link>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}
