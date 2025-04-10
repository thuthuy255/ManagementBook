import { useState, useCallback, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useNavigate } from 'react-router';
import { getAllBannerQuery } from '../services/banner.query';
import { deleteBanner } from '../services/banner.api';
const useListBanner = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false,
    modalDelete: false,
    total: 0,
    quantity: 0
  });
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
    keyword: '',
    sort: 'asc',
    active: 1
  });

  const { data: dataBanner, isFetching: isFetchingBanner, error, refetch: refetchBanner } = getAllBannerQuery({ params: searchParams });

  const handleSearchTable = useCallback((value) => {
    setSearchParams((prev) => ({
      ...prev,
      keyword: value
    }));
  }, []);

  const handleFilterBanner = useCallback((status) => {
    setSearchParams((prev) => ({
      ...prev,
      active: status
    }));
  }, []);

  const handleNavigateAdd = useCallback(() => {
    navigate('/add-banner');
  }, [navigate]);

  const handlePaginationChange = useCallback((model) => {
    setSearchParams((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
  }, []);

  const handleNavigate = (name) => {
    navigate(`/update-banner?name=${name}&active=${searchParams.active}`);
  };

  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);

  const handleDeleteConfirm = useCallback((id) => {
    if (!id) return;
    handleToggleModalDelete();
    setSelectedItem(id);
  }, []);

  const handleEdit = (banner) => {};

  const handleDeleteBanner = useCallback(async () => {
    dispacth(showLoading());
    if (!selectedItem) {
      dispacth(hideLoading());
      showToast('Không tìm thấy banner', 'error');
      return;
    }
    try {
      const response = await deleteBanner({
        key: selectedItem
      });
      if (response?.err !== 0) {
        showToast(response?.mess, 'warning');
        return;
      }
      await refetchBanner();
      showToast('Xóa banner thành công', 'success');
    } catch (error) {
      console.error('Lỗi khi xóa banner:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      dispacth(hideLoading());
      handleToggleModalDelete();
    }
  }, [selectedItem]);

  useEffect(() => {
    if (dataBanner) {
      setStateComponent((prev) => ({
        ...prev,
        total: dataBanner?.totalPage,
        quantity: dataBanner?.data?.count
      }));
    }
  }, [dataBanner]);

  const columns = [
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
        return <img src={params.value} alt="Ảnh sản phẩm" width={80} height={80} />;
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
        console.log('🚀 ~ useListBanner ~ params:', params.value);
        return <span>{params?.value == 1 ? 'Hiển thị' : 'Không hiển thị'}</span>;
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
          <IconButton color="primary" size="small" onClick={() => handleNavigate(params.row.name)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return {
    stateComponent,
    selectedItem,
    handleEdit,
    columns,
    handleDeleteBanner,
    handleToggleModalDelete,
    handleDeleteConfirm,
    handleSearchTable,
    handleNavigateAdd,
    isFetchingBanner,
    dataBanner,
    searchParams,
    handlePaginationChange,
    handleFilterBanner
  };
};

export default useListBanner;
