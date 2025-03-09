import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastTypes = {
  success: {
    className: 'bg-green-500 text-white',
    icon: '✅',
    name: 'Thành công'
  },
  warning: {
    className: 'bg-yellow-500 text-black',
    icon: '⚠️',
    name: 'Cảnh báo'
  },
  error: {
    className: 'bg-red-500 text-white',
    icon: '❌',
    name: 'Có lỗi xảy ra'
  }
};

/**
 * Hiển thị thông báo tùy chỉnh.
 * @param {string} message - Nội dung chi tiết của toast.
 * @param {'success' | 'warning' | 'error'} [type='success'] - Loại thông báo (success, warning, error).
 */
export const showToast = (message, type = 'success') => {
  const toastType = toastTypes[type] || toastTypes.success;

  toast(
    <div className="flex flex-col" style={{ flexDirection: 'column' }}>
      <strong className="text-lg">{toastType.name}</strong>
      <span>{message}</span>
    </div>,
    {
      className: `p-3 rounded-lg shadow-lg ${toastType.className}`,
      icon: toastType.icon,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  );
};
