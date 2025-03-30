import { showToast } from 'components/notification/CustomToast';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
export default function useAddPromotion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const formik = useFormik({
    initialValues: {
      code: '',
      discountType: '',
      value: 0,
      minOrderAmount: 0,
      expirationDate: '',
      active: true
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Mã giảm giá không được để trống'),
      discountType: Yup.string().oneOf(['percent', 'fixed'], 'Loại giảm giá không hợp lệ').required('Loại giảm giá không được để trống'),
      value: Yup.number()
        .typeError('Giá trị phải là số')
        .min(0, 'Giá trị phải lớn hơn hoặc bằng 0')
        .required('Giá trị không được để trống'),
      minOrderAmount: Yup.number().typeError('Giá trị đơn hàng tối thiểu phải là số').min(0, 'Giá trị đơn hàng tối thiểu không hợp lệ'),
      expirationDate: Yup.date().typeError('Ngày hết hạn không hợp lệ').required('Ngày hết hạn không được để trống'),
      active: Yup.boolean().required('Trạng thái không được để trống')
    }),
    onSubmit: handleSubmitForm
  });

  return { formik };
}
