import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography, Box, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

export default function AnalyticEcommerce({
  color = 'primary',
  title,
  count,
  icon,
  percentage,
  isLoss
}) {
  return (
    <MainCard
      contentSX={{ p: 2.25 }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: (theme) => `4px solid ${theme.palette[color]?.main || color}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows?.z1 || theme.shadows[3]
        }
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.secondary" fontWeight="500">
            {title}
          </Typography>
          {icon && (
            <Avatar
              sx={{
                bgcolor: (theme) => theme.palette[color]?.lighter || 'grey.100',
                color: (theme) => theme.palette[color]?.main || 'grey.700',
                width: 40,
                height: 40
              }}
            >
              {icon}
            </Avatar>
          )}
        </Stack>

        <Box>
          <Typography variant="h4" color="inherit" fontWeight="bold">
            {count}
          </Typography>
          {percentage && (
            <Typography variant="caption" color={isLoss ? 'error.main' : 'success.main'} sx={{ fontWeight: 'bold' }}>
              {isLoss ? '-' : '+'}{percentage}% <Typography component="span" variant="caption" color="text.secondary">so với tháng trước</Typography>
            </Typography>
          )}
        </Box>
      </Stack>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  icon: PropTypes.node,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool
};
