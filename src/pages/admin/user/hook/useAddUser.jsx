import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from 'react-query';
import { showToast } from 'components/notification/CustomToast';

import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { CreateStaff } from '../services/User.api';

const useAddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmitForm = useCallback(
    async (values) => {
      dispatch(showLoading());
      try {
        const response = await CreateStaff(values);
        if (response && response?.err === 0) {
          showToast('Thêm thành công nhân viên', 'success');
          await queryClient.invalidateQueries(['GetAllUser']);
          navigate('/user-management');
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
      email: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      address: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên không được bỏ trống'),
      email: Yup.string().required('Địa chỉ email không được bỏ trống'),
      password: Yup.string().required('Mật khẩu không được bỏ trống'),
      passwordConfirm: Yup.string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
      phoneNumber: Yup.string().required('Số điện thoại không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống')
    }),
    onSubmit: handleSubmitForm
  });
  return { formik };
};
export default useAddUser;
