import { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from 'components/notification/CustomToast';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import { useNavigate, useParams } from 'react-router';
import { ListBook, updateBook } from '../services/book.api';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { convertUrlsToFiles } from 'utils/fileUtils';

export default function useUpdateBook() {
  const { slug } = useParams();

  const [categoryBook, setCategoryBook] = useState([]);
  const [dataBook, setDataBook] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailBook = useCallback(async () => {
    dispatch(showLoading());
    try {
      const params = {
        slug
      };
      const res = await ListBook(params);
      if (!res || res?.err !== 0) {
        showToast(res?.mess, 'warning');
        return;
      }
      const currentBook = res?.data?.rows[0];
      const imageFiles = await convertUrlsToFiles(currentBook.img_src);
      const updatedBook = { ...currentBook, img_src: imageFiles };

      setDataBook(updatedBook);
    } catch (error) {
      console.error('Đã có lỗi xảy ra', error);
      showToast('Đã có lỗi xảy ra', 'warning');
    } finally {
      dispatch(hideLoading());
    }
  }, [slug]);

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

  useEffect(() => {
    fetchCategories();
    handleDetailBook();
  }, []);

  const handleSubmitForm = useCallback(
    async (values) => {
      console.log('data Book', values.img_src);

      const formData = new FormData();
      formData.append('productID', dataBook?.id);
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
        const response = await updateBook(formData);

        if (response && response?.err === 0) {
          showToast(response?.mess, 'success');
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
    [setLoading, showToast, navigate, dataBook]
  );

  // Formik config
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataBook?.name || '',
      price: dataBook?.price || '',
      description: dataBook?.description || '',
      author: dataBook?.author || '',
      publisher: dataBook?.publisher || '',
      qty: dataBook?.qty || '',
      type: dataBook?.type || '',
      img_src: dataBook?.img_src || []
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
