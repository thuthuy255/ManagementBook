import { Grid, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastTypes = {
  success: {
    style: { background: 'linear-gradient(to right, #38a169, #2f855a)', color: 'white' },
    icon: '✅',
    name: 'Thành công'
  },
  warning: {
    style: { background: 'linear-gradient(to right, #ecc94b, #d69e2e)', color: 'black' },
    icon: '⚠️',
    name: 'Cảnh báo'
  },
  error: {
    style: { background: 'linear-gradient(to right, #e53e3e, #c53030)', color: 'white' },
    icon: '❌',
    name: 'Lỗi'
  }
};
const CustomIcon = (props) => {
  if (props.isLoading) return <Spinner />;

  switch (props.type) {
    case 'info':
      return <Info color={iconColor} />;
    case 'success':
      return <Success color={iconColor} />;
    case 'error':
      return <Error color={iconColor} />;
    case 'warning':
      return <Warning color={iconColor} />;
    default:
      return undefined;
  }
};
/**
 * Hiển thị thông báo tùy chỉnh với giao diện đẹp.
 * @param {string} message - Nội dung thông báo.
 * @param {'success' | 'warning' | 'error'} [type='success'] - Loại thông báo.
 * @param {Object} [options={}] - Tuỳ chỉnh thêm cho toast.
 */
export const showToast = (message, type = 'success', options = {}) => {
  console.log('🚀 ~ showToast ~ type:', type);
  console.log('🚀 ~ showToast ~ message:', message);

  const toastType = toastTypes[type] || toastTypes.success;

  toast(
    <Grid sx={{ display: 'flex' }} className="items-center gap-4 p-3" s>
      {/* Icon */}
      <Grid>
        <span className=" animate-bounce" style={{ fontSize: '25px' }}>
          {toastType.icon}
        </span>
      </Grid>
      <Grid>
        <Typography variant="h5" gutterBottom mb={0}>
          {toastType.name}
        </Typography>
        <div>
          <span className="text-sm">{message}</span>
        </div>
      </Grid>
      {/* Nội dung */}
    </Grid>,
    {
      className: `p-4 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 ${toastType.className}`,
      icon: false, // Vì đã có icon riêng trong content
      position: 'top-right',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored', // Có thể đổi thành 'light' hoặc 'dark'
      style: {
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        ...toastType.style
      },
      ...options // Hỗ trợ truyền thêm tùy chọn
    }
  );
};
