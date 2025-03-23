import { useCallback, useEffect, useState } from 'react';
import { getAllUserQuery } from '../services/user.query';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useListUser = () => {
  const [searchBody, setSearchBody] = useState({
    page: 1,
    limit: 5,
    keyword: '',
    sort: 'asc'
  });
  const { data: dataListUser, isFetching: isFetchingPost, error, refetch: refetchPost } = getAllUserQuery({ params: searchBody });
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    modalDelete: false,
    total: 0,
    quantity: 0
  });

  const [selectedPost, setSelectedPost] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);

  const handleSelectedIds = (selectedIds) => {
    setSelectedPost(selectedIds);
  };
  const handleDelete = async () => {
    dispatch(showLoading());
    if (!selectedPost) {
      showToast('Không tồn tại id bài viết', 'error');
      return;
    }
    try {
      const body = {
        ArticleID: selectedPost
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

  const handleRemoveMultipleItems = useCallback(() => {
    if (selectedPost?.length <= 0) {
      showToast('Bạn cần chọn ít nhất một mục để tiếp tục', 'warning');
      return;
    }
    handleToggleModalDelete();
  }, [navigate, selectedPost]);

  const handleDeleteConfirm = useCallback((item) => {
    if (!item) return;
    handleToggleModalDelete();
    setSelectedPost([item.id]);
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

  const handleEdit = useCallback(() => {
    navigate('/update-user');
  }, []);

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
      field: 'actions',
      headerName: 'Hành động',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
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
    selectedPost,
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
    handlePaginationChange
  };
};

export default useListUser;
