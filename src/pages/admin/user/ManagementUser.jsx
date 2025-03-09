import { Grid, IconButton, Paper } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetAllUser } from './services/User.api';
import { showToast } from 'components/notification/CustomToast';
import Loading from 'components/loading/Loading';
import { textAlign } from '@mui/system';
const columns = [
  {
    field: 'name',
    headerName: 'Họ và tên',
    flex: 1,
    renderCell: (params) => <span>{params.value.toUpperCase() || 'Không có'}</span> // In hoa tên
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    renderCell: (params) => <a href={`mailto:${params.value}`}>{params.value || 'Không có'}</a> // Click gửi email
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    flex: 1,
    renderCell: (params) => <span> {params.value || 'Không có'}</span> // Thêm icon điện thoại
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    flex: 1,
    renderCell: (params) => <i>{params.value || 'Không có'}</i> // In nghiêng địa chỉ
  },
  {
    field: 'actions',
    headerName: 'Hành động',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <>
        <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }
];

export default function ManagementUser() {
  const [stateListUser, setStateListUser] = useState({
    page: 1,
    pageSize: 10,
    count: 0,
    listUser: []
  });
  const paginationModel = { page: 0, pageSize: 10 };

  const [loading, setLoading] = useState(false);

  const handleGetListUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GetAllUser();

      if (response?.err === 0) {
        setStateListUser((prev) => ({
          ...prev,
          listUser: response?.data?.rows,
          total: response?.data?.count
        }));
        // showToast(response?.mess, 'success');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  }, []);

  useEffect(() => {
    handleGetListUser();
  }, []);
  const handleEdit = (row) => {
    console.log('Chỉnh sửa:', row);
  };

  const handleDelete = (id) => {
    console.log('Xóa ID:', id);
  };
  if (loading) {
    return (
      <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
        <Loading />
      </Grid>
    );
  }
  return <StyledDataGrid rows={stateListUser.listUser} columns={columns} paginationModel={paginationModel} />;
}
