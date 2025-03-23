import * as Yup from 'yup';

export const passwordValidation = Yup.string()
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*\d).{6,}$/,
    'Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa, một ký tự đặc biệt và một chữ số'
  )
  .required('Mật khẩu là bắt buộc');
