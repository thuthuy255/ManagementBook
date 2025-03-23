import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Button, Divider, Grid, InputLabel, OutlinedInput, Stack, Typography, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { showToast } from 'components/notification/CustomToast';
import { useNavigate } from 'react-router';
import { ResendEmail, VerifyEmail, VerifyForgotPassword } from '../services/auth.api';
import { useSearchParams } from 'react-router-dom';
import CountdownTimer from 'components/CountdownTimer';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';

export default function AuthVerifyEmail({ onSubmit }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const otpToken = searchParams.get('otpToken');
  const emailUser = searchParams.get('email');
  const typePage = searchParams.get('type');
  console.log('🚀 ~ AuthVerifyEmail ~ typePage:', typePage);
  const [resetTimer, setResetTimer] = useState(false);
  const [otpTokenCurrent, setOtpCurrent] = useState(otpToken);
  console.log(otpTokenCurrent);

  const handleUpdateOTP = useCallback((optToken) => {
    setOtpCurrent(optToken);
  }, []);

  const handleSubmitForm = useCallback(
    (values, { setSubmitting }) => {
      dispatch(showLoading());
      const body = {
        ...values,
        otpToken: otpTokenCurrent
      };
      if (typePage === 'forgot-password') {
        VerifyForgotPassword(body)
          .then((response) => {
            if (response.err === 0) {
              showToast('Xác minh thành công', 'success');
              navigate(`/`, { replace: true });
            } else {
              showToast(response.mess, 'warning');
            }
          })
          .catch((error) => {
            console.error('Lỗi đăng ký:', error);
            showToast('Có lỗi xảy ra ' + error, 'error');
          })
          .finally(() => {
            setSubmitting(false); // Dừng trạng thái loading
            dispatch(hideLoading());
          });
      } else {
        VerifyEmail(body)
          .then((response) => {
            if (response.err === 0) {
              showToast('Xác minh thành công', 'success');
              navigate(`/`, { replace: true });
            } else {
              showToast(response.mess, 'warning');
            }
          })
          .catch((error) => {
            console.error('Lỗi đăng ký:', error);
            showToast('Có lỗi xảy ra ' + error, 'error');
          })
          .finally(() => {
            setSubmitting(false); // Dừng trạng thái loading
            dispatch(hideLoading());
          });
      }
    },
    [navigate, otpTokenCurrent]
  );

  const handleResendOTP = useCallback(() => {
    const body = {
      email: emailUser
    };
    ResendEmail(body)
      .then((response) => {
        console.log(response);
        if (response.err === 0) {
          showToast('OTP đã được gửi lại', 'success');
          handleUpdateOTP(response.otpToken);
        } else {
          showToast(response.mess, 'warning');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra ' + error, 'error');
      });
  }, [emailUser]);

  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={Yup.object().shape({
        otp: Yup.string()
          .matches(/^[0-9]{6}$/, 'Mã OTP phải gồm 6 số')
          .required('Vui lòng nhập mã OTP')
      })}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="otp-input">Nhập mã OTP</InputLabel>
                <OutlinedInput
                  id="otp-input"
                  type="text"
                  placeholder="Nhập mã OTP gồm 6 số"
                  fullWidth
                  value={values.otp}
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.otp && errors.otp)}
                />
                {touched.otp && errors.otp && <FormHelperText error>{errors.otp}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Xác nhận OTP
                </Button>
              </AnimateButton>
            </Grid>

            <Grid item xs={12}>
              <Divider>
                <Typography variant="caption">Chưa nhận được mã?</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <CountdownTimer key={resetTimer} initialTime={10} onResend={handleResendOTP} />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthVerifyEmail.propTypes = {
  onSubmit: PropTypes.func
};
