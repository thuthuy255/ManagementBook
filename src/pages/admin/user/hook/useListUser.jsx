import { useCallback, useEffect, useState } from 'react';
import { getAllStaffQuery } from '../services/user.query';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { formatDate } from 'utils/format/FormatDate';
import { showToast } from 'components/notification/CustomToast';
import { hideLoading, showLoading } from 'features/slices/loading.slice';

import { blockUser } from '../services/User.api';
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
const useListUser = () => {
  const [searchBody, setSearchBody] = useState({
    page: 1,
    limit: 5,
    keyword: '',
    sort: 'asc'
  });
  const { data: dataListUser, isFetching: isFetchingPost, error, refetch: refetchPost } = getAllStaffQuery({ params: searchBody });

  const [stateComponent, setStateComponent] = useState({
    modal: false,
    modalDelete: false,
    modalLockUser: false,
    modalUnLockUser: false,
    total: 0,
    quantity: 0
  });

  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);

  const handleUpdateState = useCallback((key, value, item = null) => {
    setStateComponent((prev) => ({
      ...prev,
      [key]: value // Cập nhật trạng thái với key và value truyền vào
    }));

    setSelectedItem(item);
  }, []);

  const handleSelectedIds = (selectedIds) => {
    setSelectedItem(selectedIds);
  };

  // Xóa user
  const handleDelete = async () => {
    dispatch(showLoading());
    if (!selectedItem) {
      showToast('Không tồn tại id bài viết', 'error');
      return;
    }
    try {
      const body = {
        ArticleID: selectedItem
      };
      const response = await deleteArticles(body);
      if (response.err === 0) {
        await refetchPost();
        handleToggleModalDelete();
        showToast('Xóa bài viết thành công', 'success');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.error('Lỗi xóa bài viết:', error);
      showToast('Có lỗi xảy ra: ', 'error');
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleSearchTable = useCallback((value) => {
    setSearchBody((prev) => ({
      ...prev,
      keyword: value
    }));
  }, []);
  const handleNavigateAdd = useCallback(() => {
    navigate('/add-user');
  }, [navigate]);

  //Validate Xóa
  const handleRemoveMultipleItems = useCallback(() => {
    if (selectedItem?.length <= 0) {
      showToast('Bạn cần chọn ít nhất một mục để tiếp tục', 'warning');
      return;
    }
    handleToggleModalDelete();
  }, [navigate, selectedItem]);

  const handleDeleteConfirm = useCallback((item) => {
    if (!item) return;
    handleToggleModalDelete();
    setSelectedItem([item.id]);
  }, []);

  // Toggle modal
  const handleToggleModalPost = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modal: !prev.modal
    }));
  }, []);

  const handlePaginationChange = useCallback((model) => {
    setSearchBody((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
  }, []);

  const handleEdit = useCallback((value) => {
    navigate(`/update-user?id=${value?.id}`);
  }, []);

  const handleLockUser = useCallback(
    (status = 'unlock') => {
      if (!selectedItem || !selectedItem.id) {
        showToast('Không tìm thấy ID', 'error');
        return;
      }
      dispatch(showLoading());
      const body = {
        userID: selectedItem.id
      };
      const params = { key: status };
      blockUser(params, body)
        .then((res) => {
          if (res?.err === 0) {
            showToast(res?.mess, 'success');
            setSelectedItem();
            refetchPost();
          } else {
            showToast(res?.mess || 'Có lỗi xảy ra', 'error');
          }
        })
        .catch((e) => {
          console.error('Lỗi:', e);
          showToast('Có lỗi xảy ra', 'error');
        })
        .finally(() => {
          dispatch(hideLoading());
          handleUpdateState(status === 'unlock' ? 'modalUnLockUser' : 'modalLockUser', false);
        });
    },
    [selectedItem, dispatch]
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Họ và tên',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params.value || 'Không có'}</span>
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span> {params.value || 'Không có'}</span> // Thêm icon điện thoại
    },
    {
      field: 'avatar',
      headerName: 'Ảnh đại diện',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <img src={params.value} alt="Ảnh đại diện" width={80} height={80} />;
      }
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params?.value ? formatDate(params.value) : 'Không có'}</span>
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
      field: 'actions',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <>
          <Tooltip title="Sửa" placement="top">
            <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {params?.row?.active == 1 ? (
            <Tooltip title="Khóa tài khoản" placement="top">
              <IconButton color="waring" size="small" onClick={() => handleUpdateState('modalLockUser', true, params.row)}>
                <LockPersonIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Mở khóa tài khoản" placement="top">
              <IconButton color="waring" size="small" onClick={() => handleUpdateState('modalUnLockUser', true, params.row)}>
                <NoEncryptionIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* <Tooltip title="Xóa tài khoản" placement="top">
            <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
        </>
      )
    }
  ];

  useEffect(() => {
    if (dataListUser) {
      setStateComponent((prev) => ({
        ...prev,
        total: dataListUser?.totalPage,
        quantity: dataListUser?.data?.count
      }));
    }
  }, [dataListUser]);
  return {
    dataListUser,
    stateComponent,
    handleToggleModalDelete,
    handleSearchTable,
    handleToggleModalPost,
    handleRemoveMultipleItems,
    columns,
    handleDelete,
    isFetchingPost,
    handleNavigateAdd,
    handleSelectedIds,
    searchBody,
    handlePaginationChange,
    handleLockUser,
    handleUpdateState
  };
};

export default useListUser;
