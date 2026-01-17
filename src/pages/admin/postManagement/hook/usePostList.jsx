import { useState, useCallback, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { deleteArticles } from '../services/Post.api';
import { formatJson } from 'utils/format/FormatJson';
import { formatDate } from 'utils/format/FormatDate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { getListPostQuery } from '../services/Post.query';
const usePostList = () => {
  const [searchBody, setSearchBody] = useState({
    page: 1,
    limit: 5,
    keyword: '',
    sort: 'asc'
  });
  const { data: posts, isFetching: isFetchingPost, error, refetch: refetchPost } = getListPostQuery({ params: searchBody });
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
    navigate('/add-post');
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

  // Chọn bài viết để chỉnh sửa
  const handleNavigatePost = (title) => {
    navigate(`/update-post/${title}`);
  };
  const handlePaginationChange = useCallback((model) => {
    setSearchBody((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    {
      field: 'title',
      headerName: 'Tiêu đề',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            maxHeight: '4.5em' /* Tùy chỉnh theo font-size */
          }}
        >
          {params.value}
        </div>
      )
    },
    {
      field: 'type',
      headerName: 'Loại',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params.value || 'Không có thể loại'}</span>
    },
    {
      field: 'img_src',
      headerName: 'Ảnh đại diện',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const listImage = formatJson(params?.value);
        if (!listImage) {
          return <span>Không có</span>;
        }
        return <img src={listImage[0]} alt="Ảnh đại diện" width={80} height={80} />;
      }
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
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
          <IconButton color="primary" size="small" onClick={() => handleNavigatePost(params.row.title)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  useEffect(() => {
    if (posts) {
      setStateComponent((prev) => ({
        ...prev,
        total: posts?.totalPage,
        quantity: posts?.data?.count
      }));
    }
  }, [posts]);
  return {
    posts,
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

export default usePostList;
