import { useDispatch } from 'react-redux';
import { getDetailUserQuery } from '../services/user.query';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { showToast } from 'components/notification/CustomToast';
import * as Yup from 'yup';
import { convertUrlsToFiles } from 'utils/fileUtils';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { updateStaff } from '../services/User.api';
export default function useUpdateUser(userId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: dataDetailUser, isLoading: loading } = getDetailUserQuery({
    params: {
      id: userId
    }
  });
  console.log('🚀 ~ useUpdateUser ~ dataDetailUser:', dataDetailUser);

  const handleSubmitForm = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append('userID', values.userID);
      formData.append('name', values.name);
      formData.append('email', values.email);

      values && formData.append('password', values.password);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('address', values.address);
      formData.append('avatar', values.avatar[0]);
      dispatch(showLoading());
      try {
        const response = await updateStaff(formData);
        if (response && response?.err === 0) {
          showToast('Cập nhật thông tin thành công', 'success');
          await queryClient.invalidateQueries(['getAllStaffQuery']);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userID: dataDetailUser?.data?.rows[0]?.id || '',
      name: dataDetailUser?.data?.rows[0]?.name || '',
      email: dataDetailUser?.data?.rows[0]?.email || '',
      password: '',
      phoneNumber: dataDetailUser?.data?.rows[0]?.phoneNumber || '',
      address: dataDetailUser?.data?.rows[0]?.address || '',
      avatar: []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên không được bỏ trống'),
      email: Yup.string().required('Địa chỉ email không được bỏ trống'),
      password: Yup.string().test(
        'isValidPassword',
        'Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa, một ký tự đặc biệt và một chữ số',
        (value) => {
          if (!value || value.length === 0) return true; // Nếu không nhập, bỏ qua validate
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*\d).{6,}$/.test(value);
        }
      ),
      phoneNumber: Yup.string().required('Số điện thoại không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      avatar: Yup.array().min(1, 'Ảnh là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });

  const convertFiles = useCallback(async () => {
    const banner = dataDetailUser?.data?.rows[0].avatar;
    const imageFiles = banner ? await convertUrlsToFiles([banner]) : [];
    formik.setFieldValue('avatar', imageFiles);
  }, [dataDetailUser]);

  useEffect(() => {
    if (dataDetailUser) {
      convertFiles();
    }
  }, [dataDetailUser]);
  return { formik, loading, dataDetailUser };
}
