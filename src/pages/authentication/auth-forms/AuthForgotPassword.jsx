import { useState } from 'react';
// Material-UI
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Project import
import AnimateButton from 'components/@extended/AnimateButton';
import { showToast } from 'components/notification/CustomToast';
import { ForgotPassword } from '../services/auth.api';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useNavigate } from 'react-router';

// ============================|| AUTH - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitForgotPassword = async (values) => {
    dispatch(showLoading());
    ForgotPassword(values)
      .then((response) => {
        if (response?.otpToken && values.email) {
          showToast('OTP đã được gửi về email của bạn', 'success');
          navigate(`/verify-email?otpToken=${response.otpToken}&email=${values.email}&type=forgot-password`);
        } else {
          showToast(response.mess, 'warning');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra' + error, 'error');
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc')
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmitForgotPassword(values);
        setSubmitted(true);
        setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-forgot">Địa chỉ email</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-forgot"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email"
                />
                {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </Stack>
            </Grid>

            {submitted && (
              <Grid item xs={12}>
                <Typography variant="body2" color="success.main" textAlign="center">
                  Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Gửi yêu cầu
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
