import { useState, useEffect, useCallback } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';

import { Box } from '@mui/system';
import { getAllBanner } from '../services/banner.api';

const useBannerManagement = () => {
  const [banner, setBanner] = useState([]);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false
  });
  const [selectedItem, setSelectedItem] = useState(null);

  // Toggle modal
  const handleToggleModalEdit = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modal: !prev.modal
    }));
  }, []);

  // Toggle loading
  const handleToggleLoading = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      loading: !prev.loading
    }));
  }, []);

  // Chọn sách để chỉnh sửa
  const handleEdit = (book) => {
    setSelectedItem(book);
    handleToggleModalEdit();
  };

  // Lấy danh sách sách từ API
  const handleListTable = () => {
    handleToggleLoading();
    getAllBanner()
      .then((response) => {
        if (response.err === 0) {
          setBanner(response?.data?.rows);
        } else {
          showToast(response.message, 'error');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra: ' + error, 'error');
      })
      .finally(() => {
        handleToggleLoading();
      });
  };

  useEffect(() => {
    handleListTable();
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    // { field: 'id', headerName: 'Mã danh mục', headerAlign: 'center', align: 'center', cellClassName: 'center-cell' },
    {
      field: 'name',
      headerName: 'Tên Banner',
      flex: 1,
      headerAlign: 'center',

      width: '100px',
      align: 'center',
      cellClassName: 'center-cell'
    },
    {
      field: 'img',
      headerName: 'Ảnh',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      height: '300px',
      renderCell: (params) => {
        return <img src={params.value} alt="Ảnh sản phẩm" width={100} height={100} />;
      }
    },
    {
      field: 'active',
      headerName: 'Hiển thị',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => {
        return <span>{params?.value == '1' ? 'Hiển thị' : 'Không hiển thị'}</span>;
      }
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Box container justifyContent={'center'} alignItems={'center'}>
            <p>{formatDate(params.value)}</p>
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '5px' }}>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleCloseModal(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return {
    banner,
    stateComponent,
    selectedItem,
    handleEdit,
    handleListTable,
    handleToggleModalEdit,
    columns
  };
};

export default useBannerManagement;
