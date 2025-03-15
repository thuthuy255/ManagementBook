// import { useState, useEffect, useCallback } from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { IconButton } from '@mui/material';
// import { showToast } from 'components/notification/CustomToast';
// import { formatPrice } from 'utils/format';
// import { GetAllArticles } from '../services/Post.api';
// import { formatJson } from 'utils/format/FormatJson';
// import { formatDate } from 'utils/format/FormatDate';
// import { useDispatch } from 'react-redux';
// const usePostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [stateComponent, setStateComponent] = useState({
//     modal: false,
//     loading: false,
//     modalDelete: false
//   });
//   const [selectedPost, setSelectedPost] = useState(null);
//   const dispatch = useDispatch();
//   const handleToggleModalDelete = useCallback(() => {
//     setStateComponent((prev) => ({
//       ...prev,
//       modalDelete: !prev.modalDelete
//     }));
//   }, []);
//   const handleDelete = async (id) => {
//     handleToggleModalDelete();
//     try {
//       const response = await deleteArticles({ id });
//       if (response.err === 0) {
//         showToast('Xóa bài viết thành công', 'success');
//         handleListPost();
//       }
//     } catch (error) {
//       console.error('Lỗi xóa bài viết:', error);
//       showToast('Có lỗi xảy ra: ' + error.message, 'error');
//     }
//   };
//   const handleDeleteConfirm = useCallback((id) => {
//     if (!id) return;
//     handleToggleModalDelete();
//     setSelectedBook(id);
//   }, []);

//   // Toggle modal
//   const handleToggleModalPost = useCallback(() => {
//     setStateComponent((prev) => ({
//       ...prev,
//       modal: !prev.modal
//     }));
//   }, []);

//   // Toggle loading
//   const handleToggleLoading = useCallback(() => {
//     setStateComponent((prev) => ({
//       ...prev,
//       loading: !prev.loading
//     }));
//   }, []);

//   // Chọn bài viết để chỉnh sửa
//   const handleEdit = (post) => {
//     setSelectedPost(post);
//     handleToggleModalPost();
//   };

//   // Gọi API lấy danh sách bài viết
//   const handleListPost = async () => {
//     handleToggleLoading();
//     try {
//       const response = await GetAllArticles();
//       if (response.err === 0) {
//         setPosts(response?.data?.rows || []);
//       } else {
//         showToast(response.message, 'error');
//       }
//     } catch (error) {
//       console.error('Lỗi lấy bài viết:', error);
//       showToast('Có lỗi xảy ra: ' + error.message, 'error');
//     } finally {
//       handleToggleLoading();
//     }
//   };

//   useEffect(() => {
//     handleListPost();
//   }, []);

//   // Cấu hình cột cho bảng
//   const columns = [
//     {
//       field: 'title',
//       headerName: 'Tiêu đề',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
//     },
//     {
//       field: 'content',
//       headerName: 'Nội dung',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => <span>{params.value || 'Không có'}</span>
//     },
//     {
//       field: 'type',
//       headerName: 'Loại',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => <span>{params.value === 'news' ? 'Tin tức' : 'Không có thể loại'}</span>
//     },
//     {
//       field: 'img_src',
//       headerName: 'Ảnh đại diện',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => {
//         const listImage = formatJson(params?.value);
//         if (!listImage) {
//           return <span>Không có</span>;
//         }
//         return <img src={listImage[0]} alt="Ảnh đại diện" width={100} height={100} />;
//       }
//     },
//     {
//       field: 'createdAt',
//       headerName: 'Ngày tạo',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => <span>{params?.value ? formatDate(params.value) : 'Không có'}</span>
//     },
//     {
//       field: 'actions',
//       headerName: 'Hành động',
//       sortable: false,
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       )
//     }
//   ];

//   return {
//     posts,
//     stateComponent,
//     selectedPost,
//     handleEdit,
//     handleListPost,
//     handleToggleModalPost,
//     columns
//   };
// };

// export default usePostList;
