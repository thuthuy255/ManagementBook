import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import {
  Grid,
  Typography,
  Skeleton,
  Box,
  Stack,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { getDashboardStats } from 'services/clients/product';
import { InfoUserState } from 'features/slices/user.slice.jsx';
import { formatPrice } from 'utils/format';

// assets
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

// local components
import LatestOrdersTable from './LatestOrdersTable';
import LatestUsersTable from './LatestUsersTable';
import StatsChart from './StatsChart';

export default function DashboardDefault() {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(InfoUserState);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    try {
      const response = await getDashboardStats();
      if (response?.err === 0) {
        setStats(response?.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ p: 1 }}>
        <Grid item xs={12}>
          <Skeleton variant="text" sx={{ fontSize: '2rem', width: '250px', mb: 2 }} />
        </Grid>
        {[1, 2, 3, 4].map((index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Bảng điều khiển</Typography>
          <Typography variant="caption" color="text.secondary">
            Chào mừng quay trở lại, {user?.name || 'Quản trị viên'}
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* 4 Thẻ thống kê */}
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce
            title="Đơn hàng"
            count={`${stats?.cards?.orders?.new} / ${stats?.cards?.orders?.total}`}
            color="warning"
            icon={<ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce
            title="Sách"
            count={`${stats?.cards?.products?.new} / ${stats?.cards?.products?.total}`}
            color="error"
            icon={<BookOutlined style={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce
            title="Người dùng"
            count={`${stats?.cards?.users?.new} / ${stats?.cards?.users?.total}`}
            color="primary"
            icon={<UserOutlined style={{ fontSize: '1.5rem' }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticEcommerce
            title="Bài viết"
            count={`${stats?.cards?.articles?.new} / ${stats?.cards?.articles?.total}`}
            color="success"
            icon={<FileTextOutlined style={{ fontSize: '1.5rem' }} />}
          />
        </Grid>

        {/* Biểu đồ */}
        <Grid item xs={12} lg={6}>
          <MainCard title="Xu hướng doanh thu (VNĐ)">
            <StatsChart data={stats?.revenueChart} name="Doanh thu" color={theme.palette.primary.main} />
          </MainCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <MainCard title="Lượt xem hệ thống">
            <StatsChart data={stats?.viewsChart} name="Lượt xem" color={theme.palette.success.main} />
          </MainCard>
        </Grid>

        {/* Bảng dữ liệu & Top Product */}
        <Grid item xs={12} md={8}>
          <MainCard title="Đơn hàng mới nhất" sx={{ mb: 3 }}>
            <LatestOrdersTable orders={stats?.latestOrders} />
          </MainCard>

          <MainCard title="Người dùng mới nhất">
            <LatestUsersTable users={stats?.latestUsers} />
          </MainCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Sản phẩm xem nhiều nhất Card */}
            {stats?.mostViewedProduct && (
              <MainCard title="Sản phẩm nổi bật" content={false}>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 3,
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        mb: 2
                      }}
                    >
                      <BookOutlined style={{ fontSize: '2.5rem' }} />
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {stats.mostViewedProduct.name}
                    </Typography>
                    <Chip
                      label={stats.mostViewedProduct.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Paper>

                  <Divider sx={{ mb: 2 }} />

                  <Stack direction="row" justifyContent="space-around" spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Lượt xem</Typography>
                      <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                        <EyeOutlined style={{ color: theme.palette.success.main }} />
                        <Typography variant="h6" fontWeight="bold">{stats.mostViewedProduct.views}</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Giá bán</Typography>
                      <Typography variant="h6" fontWeight="bold" color="secondary">
                        {formatPrice(stats.mostViewedProduct.price)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </MainCard>
            )}

            {/* Quick Stats Overlay (Placeholder for more info) */}
            <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Mistik Insight</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Hệ thống đang hoạt động ổn định. Có {stats?.cards?.orders?.new} đơn hàng mới cần xử lý ngay.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
