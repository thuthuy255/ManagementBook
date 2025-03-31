import { Button, IconButton } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllDiscountQuery } from '../services/promotion.query';
import { formatDate } from 'utils/format/FormatDate';
import { formatPrice } from 'utils/format';
import { useNavigate } from 'react-router';
export default function useListManagementPromotion() {
  const navigate = useNavigate();
  const [searchPromotion, setSearchPromotion] = useState({
    keyword: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price',
    sort: 'desc',
    page: 1,
    limit: 5
  });
  const [stateComponent, setStateComponent] = useState({
    loading: false,
    modalDelete: false,
    total: 0,
    quantity: 0,
    modalWarring: false
  });
  const { data: listPromotion, isLoading: isFetchingPromotion, error, refetch } = getAllDiscountQuery({ params: searchPromotion });
  const handleSearchTable = useCallback((value) => {
    setSearchPromotion((prev) => {
      if (prev.keyword === value) return prev; // Tránh cập nhật không cần thiết
      return {
        ...prev,
        keyword: value
      };
    });
  }, []);

  const handleNavigateAdd = useCallback(() => {
    navigate('/add-promotion');
  }, [navigate]);

  const handleNavigateUpdate = useCallback(() => {
    navigate('/update-promotion');
  }, [navigate]);
  const columns = [
    {
      field: 'code',
      headerName: 'Mã giảm giá',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'discountType',
      headerName: 'Loại giảm giá',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (params.value === 'percent' ? 'Phần trăm' : 'Tiền mặt')
    },
    {
      field: 'value',
      headerName: 'Giá trị giảm',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <div>{params.value}%</div> // Giả sử luôn là phần trăm
    },
    {
      field: 'minOrderAmount',
      headerName: 'Giá trị đơn tối thiểu',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <div>{formatPrice(params.value)}</div> // Định dạng giá tiền
    },
    {
      field: 'expirationDate',
      headerName: 'Ngày hết hạn',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => formatDate(params.value) // Định dạng ngày tháng
    },
    {
      field: 'active',
      headerName: 'Trạng thái',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" color={params.value === 1 ? 'success' : 'error'} size="small">
          {params.value === 1 ? 'Đã kích hoạt' : 'Đang bị khóa'}
        </Button>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => formatDate(params.value) // Định dạng ngày tạo
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => formatDate(params.value) // Định dạng ngày cập nhật
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => handleNavigateUpdate(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  const handlePaginationChange = useCallback((model) => {
    setSearchPromotion((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
  }, []);

  useEffect(() => {
    if (listPromotion) {
      setStateComponent((prev) => ({
        ...prev,
        total: listPromotion?.page,
        quantity: listPromotion?.data?.count
      }));
    }
  }, [listPromotion]);
  return {
    searchPromotion,
    columns,
    isFetchingPromotion,
    handleSearchTable,
    listPromotion,
    stateComponent,
    handlePaginationChange,
    handleNavigateAdd
  };
}
