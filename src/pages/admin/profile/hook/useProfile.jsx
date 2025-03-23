import { InfoUserState } from 'features/slices/user.slice';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateUser } from '../services/profile.api';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { showToast } from 'components/notification/CustomToast';
const useProfiles = () => {
  const infoUser = useSelector(InfoUserState);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(infoUser.avatar);
  const handleSubmitForm = useCallback(async (values) => {
    const formData = new FormData();
    formData.append('avatar', values.avatar);
    formData.append('userID', values.userID);
    formData.append('name', values.name);
    formData.append('address', values.address);
    dispatch(showLoading());
    try {
      const response = await updateUser(formData);
      if (response?.err === 0) {
        showToast('Cập nhật thành công', 'success');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmitForm ~ error:', error);
      showToast(error, 'error');
    } finally {
      dispatch(hideLoading());
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // Hiển thị ảnh tạm thời
      formik.setFieldValue('avatar', file); // Lưu file vào formik
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: infoUser?.address || '',
      name: infoUser?.name || '',
      userID: infoUser?.id || '',
      phoneNumber: infoUser?.phoneNumber || '',
      avatar: infoUser?.avatar || '',
      roleUser: infoUser?.role || '',
      email: infoUser?.email || ''
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Địa chỉ không được để trống'),
      name: Yup.string().required('Tên không được để trống'),
      phoneNumber: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ, phải có 10-11 chữ số'),
      email: Yup.string().required('Email không được để trống').email('Email không hợp lệ')
    }),
    onSubmit: handleSubmitForm
  });
  return { infoUser, formik, avatar, setAvatar, handleImageChange };
};
export default useProfiles;
