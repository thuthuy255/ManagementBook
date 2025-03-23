import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { GetAllArticles, updateArticles } from '../services/Post.api';
import { showToast } from 'components/notification/CustomToast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { convertUrlsToFiles } from 'utils/fileUtils';
import { useQueryClient } from 'react-query';
export default function useUpdatePost() {
  const { title } = useParams();
  const [categoryPost, setCategoryPost] = useState([]);
  const [dataPost, setDataPost] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleDetailBook = useCallback(async () => {
    dispatch(showLoading());
    try {
      const params = {
        title
      };
      const res = await GetAllArticles(params);
      if (!res || res?.err !== 0) {
        showToast(res?.mess, 'warning');
        return;
      }

      const currentData = res?.data?.rows[0];
      const imageFiles = await convertUrlsToFiles(currentData.img_src);

      const updatedPost = { ...currentData, img_src: imageFiles };

      setDataPost(updatedPost);
    } catch (error) {
      console.error('Đã có lỗi xảy ra', error);
      showToast('Đã có lỗi xảy ra', 'warning');
    } finally {
      dispatch(hideLoading());
    }
  }, [title]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      if (!response || response?.err !== 0) {
        showToast(response?.mess, 'warning');
        return;
      }

      setCategoryPost(response?.data?.rows);
    } catch (error) {
      showToast('Có lỗi xảy ra: ' + error.message, 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
    handleDetailBook();
  }, []);

  const handleSubmitForm = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append('ArticleID', values.ArticleID);
      // formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('type', values.type);
      if (Array.isArray(values.img_src) && values.img_src.length > 0) {
        values.img_src.forEach((file) => {
          formData.append('img_src', file);
        });
      }
      dispatch(showLoading());
      try {
        const response = await updateArticles(formData);
        if (response && response?.err === 0) {
          showToast('Sửa thành công bài viết', 'success');
          await queryClient.invalidateQueries(['getListPostQuery']);
          navigate('/post-management');
        } else {
          showToast(response?.mess, 'warning');
        }
      } catch (error) {
        console.error('Đã có lỗi xảy ra', error);
        showToast('Có lỗi xảy ra', 'error');
      } finally {
        dispatch(hideLoading());
      }
    },
    [dispatch, showToast, navigate]
  );

  // Formik config
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ArticleID: dataPost?.id || '',
      title: dataPost?.title || '',
      content: dataPost?.content || '',
      type: dataPost?.type || '',
      img_src: dataPost?.img_src || []
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Tiêu đề không được để trống'),
      content: Yup.string().required('Nội dung không được để trống'),
      type: Yup.string().required('Loại không được để trống'),
      img_src: Yup.array().min(1, 'Ảnh là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });

  return { formik, categoryPost, loading };
}
