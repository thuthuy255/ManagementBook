import { useState, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { deleteArticles, GetAllArticles } from '../services/Post.api';
import { formatJson } from 'utils/format/FormatJson';
import { formatDate } from 'utils/format/FormatDate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
const usePostList = () => {
  const [posts, setPosts] = useState([]);
  console.log('dkjádjahsd', posts);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false,
    modalDelete: false
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);

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
      console.log('Đây là phản hoòi', response);
      if (response.err === 0) {
        await handleListPost();
        handleToggleModalDelete();
        showToast('Xóa bài viết thành công', 'success');
      }
    } catch (error) {
      console.error('Lỗi xóa bài viết:', error);
      showToast('Có lỗi xảy ra: ', 'error');
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleDeleteConfirm = useCallback((id) => {
    if (!id) return;
    handleToggleModalDelete();
    setSelectedPost(id);
  }, []);

  // Toggle modal
  const handleToggleModalPost = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modal: !prev.modal
    }));
  }, []);

  const handleToggleLoading = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      loading: !prev.loading
    }));
  }, []);

  // Chọn bài viết để chỉnh sửa
  const handleNavigatePost = (title) => {
    navigate(`/update-post/${title}`);
  };

  // Gọi API lấy danh sách bài viết
  // Gọi API lấy danh sách bài viết
  const handleListPost = () => {
    handleToggleLoading();
    GetAllArticles()
      .then((response) => {
        if (response.err === 0) {
          console.log('Đây là data', response);
          setPosts(response?.data?.rows || []);
        } else {
          showToast(response.message, 'error');
        }
      })
      .catch((error) => {
        console.error('Lỗi lấy bài viết:', error);
        showToast('Có lỗi xảy ra: ' + error.message, 'error');
      })
      .finally(() => {
        handleToggleLoading();
      });
  };

  useEffect(() => {
    handleListPost();
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
      renderCell: (params) => <span>{params.value || 'Không có'}</span>
    },
    {
      field: 'type',
      headerName: 'Loại',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <span>{params.value === 'news' ? 'Tin tức' : 'Không có thể loại'}</span>
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
        return <img src={listImage[0]} alt="Ảnh đại diện" width={100} height={100} />;
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
          <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return {
    posts,
    stateComponent,
    selectedPost,
    handleToggleModalDelete,
    handleListPost,
    handleToggleModalPost,
    columns,
    handleDelete
  };
};

export default usePostList;
