import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import { useNavigate } from 'react-router';
import { CreateBook } from '../services/book.api';

export default function useAddBook() {
  const [categoryBook, setCategoryBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  // Gọi API lấy danh sách thể loại sách
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

  // Hàm xử lý submit form
  const handleSubmitForm = useCallback(async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append('author', values.author);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('publisher', values.publisher);
    formData.append('qty', values.qty);
    formData.append('img_src', values.img_src);
    formData.append('type', values.type);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    setLoading(true);
    try {
      const response = await CreateBook(formData);
      if (response && response?.err === 0) {
        showToast(response?.mess, 'success');
        naviagte('/book-management');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.error('Đã có lỗi xảy ra', error);
      showToast('Có lỗi xảy ra', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

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
      img_src: []
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

  return { formik, categoryBook, loading };
}
