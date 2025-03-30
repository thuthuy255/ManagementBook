import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Grid,
  Tab,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import { getAllListOrderClient } from './services/order.query';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useDispatch } from 'react-redux';
import { updateOrderCanceled } from 'pages/admin/order/services/order.api';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';
import Loading from 'components/loading/Loading';

export default function Order() {
  const [value, setValue] = useState('order');
  console.log('🚀 ~ Order ~ value:', value);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const today = new Date();
  const fromDate = today.toISOString().split('T')[0];

  const {
    data: dataOrder,
    isLoading,
    refetch
  } = getAllListOrderClient({
    params: {
      fromDate: fromDate,
      status: value
    }
  });

  const handleCancelOrder = (updatedAt) => {
    const body = {
      oderID: updatedAt
    };
    dispatch(showLoading());
    updateOrderCanceled(body)
      .then((res) => {
        if (res?.err === 0) {
          showToast('Đã xác nhận đơn hàng', 'success');
          refetch();
        } else {
          showToast(res?.mess, 'error');
        }
      })
      .catch((e) => {
        console.error('Có lỗi xảy ra:', e);
        showToast(e, 'error');
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
            <TabList
              onChange={handleChange}
              aria-label="Order Tabs"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: 'red' },
                '& .MuiTab-root': { color: 'gray' },
                '& .Mui-selected': { color: 'black !important' }
              }}
            >
              <Tab label="Chờ Xác Nhận" value="order" />
              <Tab label="Đã Hủy" value="canceled" />
              <Tab label="Hoàn Thành" value="completed" />
            </TabList>
          </Box>

          {isLoading ? (
            <Grid minHeight={'calc(50vh)'} display="flex" justifyContent="center" mt={2} alignItems={'center'}>
              <Loading />
            </Grid>
          ) : (
            <>
              <TabPanel value={value}>
                {dataOrder?.data?.length ? (
                  dataOrder?.data?.map((order, index) => (
                    <Box key={index} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
                      <Typography variant="h6">Tổng tiền: {order.total.toLocaleString()} VNĐ</Typography>
                      <Typography variant="subtitle1">Số lượng: {order.qty} sản phẩm</Typography>
                      <List>
                        {order.products.map((product) => (
                          <ListItem key={product.id} divider>
                            <Card sx={{ display: 'flex', width: '100%' }}>
                              {product.img_src && (
                                <CardMedia
                                  component="img"
                                  sx={{ width: 100, height: 100 }}
                                  image={JSON.parse(product.img_src)[0]}
                                  alt={product.name}
                                />
                              )}
                              <CardContent>
                                <Typography variant="body1" fontWeight="bold">
                                  {product.name}
                                </Typography>
                                <Typography variant="body2">Giá: {product.price.toLocaleString()} VNĐ</Typography>
                                <Typography variant="body2">Số lượng: {product.qty}</Typography>
                              </CardContent>
                            </Card>
                          </ListItem>
                        ))}
                      </List>
                      {value === 'order' && (
                        <Button variant="contained" color="error" onClick={() => handleCancelOrder(order.updatedAt)} sx={{ mt: 2 }}>
                          Hủy Đơn Hàng
                        </Button>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography>Không có đơn hàng.</Typography>
                )}
              </TabPanel>
            </>
          )}
        </TabContext>
      </Grid>
    </Grid>
  );
}
