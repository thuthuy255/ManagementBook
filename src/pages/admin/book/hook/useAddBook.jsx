import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import { useNavigate } from 'react-router';
import { CreateBook } from '../services/book.api';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useQueryClient } from 'react-query';

export default function useAddBook() {
  const [categoryBook, setCategoryBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        if (!response || response?.err !== 0) {
          showToast(response?.mess, 'warning');
          return;
        }
        setCategoryBook(response?.data?.rows);
      } catch (error) {
        showToast('Có lỗi xảy ra: ' + error.message, 'error');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmitForm = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append('author', values.author);
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('publisher', values.publisher);
      formData.append('qty', values.qty);
      formData.append('type', values.type);
      if (Array.isArray(values.img_src) && values.img_src.length > 0) {
        values.img_src.forEach((file) => {
          formData.append('img_src', file);
        });
      }
      dispatch(showLoading());
      try {
        const response = await CreateBook(formData);
        if (response && response?.err === 0) {
          showToast('Thêm thành công sách', 'success');
          await queryClient.invalidateQueries(['getAllBookQuery']);
          navigate('/book-management');
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
    initialValues: {
      name: '',
      price: '',
      description: '',
      author: '',
      publisher: '',
      qty: '',
      type: '',
      img_src: [] // ✅ Khởi tạo đúng kiểu dữ liệu
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên sản phẩm không được để trống'),
      price: Yup.number().typeError('Giá phải là số').required('Giá không được để trống'),
      description: Yup.string(),
      author: Yup.string().required('Tác giả không được để trống'),
      publisher: Yup.string().required('Nhà xuất bản không được để trống'),
      qty: Yup.number().typeError('Số lượng phải là số').required('Số lượng không được để trống'),
      type: Yup.string().required('Loại không được để trống'),
      img_src: Yup.array().min(1, 'Ảnh sản phẩm là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });

  return { formik, categoryBook };
}
