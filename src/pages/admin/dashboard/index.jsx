import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrdersTable from './OrdersTable';
import { formatPrice } from 'utils/format';
import { useEffect, useState } from 'react';
import { getAllOrdersAdmin, getProducts } from 'services/clients/product';
import { GetAllUser } from '../user/services/User.api';

export default function DashboardDefault() {
  const [value, setValue] = useState(null);
  const [user, setUser] = useState(null);
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    try {
      const [orders, userData, products] = await Promise.all([
        getAllOrdersAdmin(),
        GetAllUser(),
        getProducts()
      ]);
      setValue(orders);
      setUser(userData?.data);
      setPro(products?.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Bảng điều khiển</Typography>
      </Grid>

      {loading ? (
        [1, 2, 3, 4].map((index) => (
          <Grid item xs={12} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        ))
      ) : (
        <>
          <Grid item xs={12} md={4} lg={3}>
            <AnalyticEcommerce title="Tổng doanh thu" count={formatPrice(value?.revenue || 0)} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <AnalyticEcommerce title="Tổng số người dùng" count={user?.count || 0} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <AnalyticEcommerce title="Tổng số đơn hàng" count={value?.totalItems || 0} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <AnalyticEcommerce title="Tổng số sản phẩm" count={pro?.count || 0} />
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <MainCard>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Đơn hàng gần đây
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            <OrdersTable />
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
}
