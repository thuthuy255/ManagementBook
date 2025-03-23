import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { createArticles } from '../services/Post.api';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useDispatch } from 'react-redux';
import { showToast } from 'components/notification/CustomToast';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import { useQueryClient } from 'react-query';

export default function useAddPost() {
  const dispatch = useDispatch();
  const [categoryPost, setCategoryPost] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const handleSubmitForm = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('type', values.type);
      if (Array.isArray(values.img_src) && values.img_src.length > 0) {
        values.img_src.forEach((file) => {
          formData.append('img_src', file);
        });
      }
      dispatch(showLoading());
      try {
        const response = await createArticles(formData);
        if (response && response?.err === 0) {
          showToast('Thêm thành công bài viết', 'success');
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

  useEffect(() => {
    fetchCategories();
  }, []);
  // Formik config
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      type: '',
      img_src: []
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Tiêu đề không được để trống'),
      content: Yup.string().required('Nội dung không được để trống'),
      type: Yup.string().required('Loại không được để trống'),
      img_src: Yup.array().min(1, 'Ảnh là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });
  return { formik, categoryPost };
}
