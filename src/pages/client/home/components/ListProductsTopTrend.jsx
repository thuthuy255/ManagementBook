import { Box, Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Loading from 'components/loading/Loading';
import ListProducts from './ListProducts';
import { formatPrice } from 'utils/format';
import '../css/Home.css';
import useListProductsTopTrend from '../hook/useListProductsTopTrend';
function ListProductsTopTrend() {
  const { value, getListCategary, isLoadingBook, books, View, handleChange, getImage } = useListProductsTopTrend();

  return (
    <Grid container item md={10} xs={12} sx={{ backgroundColor: BACKGROUND_WHITE }} borderRadius={'8px'}>
      <Grid
        item
        container
        display={'flex'}
        alignItems={'center '}
        px={2}
        style={{ background: 'linear-gradient(135deg, #FFA500, #FF6347)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
      >
        <TrendingUpIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0} pt={2} pb={2}>
          Xu hướng mua sắm
        </Typography>
      </Grid>

      <Grid item container>
        {value ? (
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: 'red' },
                  '& .MuiTab-root': { color: 'gray' },
                  '&:hover': { color: `${BACKGROUND_DEFAULT} !important` },
                  '& .Mui-selected': { color: `${BACKGROUND_DEFAULT} !important` },
                  '& .root-MuiTab-root.Mui-selected': { color: `${BACKGROUND_DEFAULT} !important` }
                }}
              >
                {getListCategary?.slice(0, 3)?.map((item) => (
                  <Tab key={item?.id} label={item.type} value={item.id} />
                ))}
              </TabList>
            </Box>
            {isLoadingBook ? (
              <Grid container minHeight={382} justifyContent="center" alignItems="center">
                <Loading />
              </Grid>
            ) : (
              getListCategary?.slice(0, 3)?.map((item) => (
                <TabPanel key={item?.id} value={item?.id} style={{ width: '100%' }}>
                  <Grid container spacing={2} mt={2} justifyContent="center">
                    {books?.data?.rows?.length > 0 ? (
                      books?.data?.rows?.map((book) => (
                        <Grid key={book?.id} item xs={6} sm={4} md={2.5} className="Button_Hover btn-boxshadown custom-padding" p={0}>
                          <ListProducts
                            slug={book?.slug}
                            image={getImage(book)}
                            title={book?.name}
                            price={formatPrice(book.price || 0)}
                            sale={'-35%'}
                            oldPrice={formatPrice(book.price || 0)}
                            star={5}
                            sold={231}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Grid minHeight={382} display={'flex'} justifyContent={'center'} pt={5}>
                        <Typography variant="h4" gutterBottom mb={0}>
                          Sản phẩm đang được cập nhật
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </TabPanel>
              ))
            )}
          </TabContext>
        ) : (
          <Loading />
        )}
      </Grid>
    </Grid>
  );
}

export default memo(ListProductsTopTrend);
