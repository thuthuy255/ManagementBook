export default useUpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmitForm = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('address', values.address);
      formData.append('avatar', values.avatar[0]);
      dispatch(showLoading());
      try {
        const response = await CreateStaff(formData);
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
      address: '',
      avatar: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên không được bỏ trống'),
      email: Yup.string().required('Địa chỉ email không được bỏ trống'),
      password: Yup.string().required('Mật khẩu không được bỏ trống'),
      passwordConfirm: Yup.string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
      phoneNumber: Yup.string().required('Số điện thoại không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      avatar: Yup.array().min(1, 'Ảnh là bắt buộc')
    }),
    onSubmit: handleSubmitForm
  });
  return { formik };
};
