import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { RegisterApi } from '../services/auth.api';
import { showToast } from 'components/notification/CustomToast';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const navigate = useNavigate();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const handleRegister = (values, { setSubmitting }) => {
    RegisterApi(values)
      .then((response) => {
        console.log(response);
        if (response?.otpToken && values.email) {
          showToast(response.mess, 'success');
          navigate(`/verify-email?otpToken=${response.otpToken}&email=${values.email}`);
        } else {
          showToast(response.mess, 'warning');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra' + error, 'error');
      })
      .finally(() => {
        setSubmitting(false); // Dừng trạng thái loading
      });
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          phoneNumber: '',
          name: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa chữ số')
            .required('Số điện thoại là bắt buộc'),
          name: Yup.string().max(255, 'họ và tên quá dài').required('Họ và tên là bắt buộc'),
          email: Yup.string().email('Email không hợp lệ').max(255, 'Email quá dài').required('Email là bắt buộc'),
          password: Yup.string().max(255, 'Mật khẩu quá dài').required('Mật khẩu là bắt buộc')
        })}
        onSubmit={handleRegister}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Số điện thoại</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    id="phone-signup"
                    type="text"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    inputProps={{}}
                  />
                </Stack>
                {touched.phoneNumber && errors.phoneNumber && (
                  <FormHelperText error id="helper-text-phone-signup">
                    {errors.phoneNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Họ và Tên</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    id="name-signup"
                    type="text"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên đầy đủ"
                    inputProps={{}}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name-signup">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Địa chỉ email</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ email"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Mật khẩu</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Đồng ý với &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Điều khoản dịch vụ
                  </Link>
                  &nbsp; và &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Chính sách bảo mật
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Tạo tài khoản
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
