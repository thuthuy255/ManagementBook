import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material'
import AnimateButton from 'components/@extended/AnimateButton';
import { Formik } from 'formik'
import FirebaseSocial from 'pages/authentication/auth-forms/FirebaseSocial';
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function Profile() {
    const [checked, setChecked] = React.useState(false);

    const handleLoginSubmit = useCallback(async (values, { setSubmitting }) => {
        Login(values)
            .then((response) => {
                if (response.err === 0) {
                    const decoded = jwtDecode(response?.access_token);
                    if (decoded && decoded?.role && response?.access_token) {
                        const currentToken = {
                            token: response.access_token,
                            role_id: decoded.role
                        };
                        dispath(setAppState(currentToken));
                        localStorage.setItem('access_token', response?.access_token);
                        showToast('Đăng nhập thành công', 'success');
                    }
                } else {
                    showToast(response?.mess, 'warning');
                }
            })
            .catch((error) => {
                console.error('Lỗi đăng ký:', error);
                showToast('Có lỗi xảy ra' + error, 'error');
            })
            .finally(() => {
                setSubmitting(false); // Dừng trạng thái loading
            });
    }, []);
    return (

        <Grid container gap={10}   >
            <Grid item md={2} bgcolor="white" sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
                borderRadius: 5,

            }}>
                <Box pb={8} pt={8}>
                    <Box p={2} component="img"
                        src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/464101933_1589786078272232_287137893144228374_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFZ_F4zxmKCgXkHtnzM65KuTZS2vXvykOVNlLa9e_KQ5W3tmi74wWkCOrXbcUjO2U_zMRjbKLnJbDRcQC0AvYom&_nc_ohc=fntF45CyjwoQ7kNvgGAS3oJ&_nc_oc=AdjDVcDqezTvMJC-iPckFI8_oIdle2kd3kIyJL2D8GUiooruud6pGDGffvYfg8TTx9k&_nc_zt=24&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AbrzYHpfX9HXEkl5D1Xz90n&oh=00_AYEx_Qw1bOzv_ic1HnccGEMa8XZOQEhdPwT6edtFMJEGug&oe=67D2F90F"
                        alt="Example"
                        sx={{ width: 150, height: 150 }}>
                    </Box>
                    <Container>
                        <Typography variant="h3" gutterBottom>Vũ Tiến Khoái </Typography>
                        <Typography gutterBottom sx={{ color: '#9FA8B9', fontSize: '16px' }}>Khoaivu2k3@gmail.com</Typography>
                    </Container>
                    <Container sx={{ marginTop: 10 }}>
                        <Typography gutterBottom variant="h4" sx={{ color: '#007AE1', fontSize: '23px' }}>Admin </Typography>
                        <Box display="flex" width={'100%'} alignItems="center" justifyContent="center">
                            <Typography variant="span" sx={{ lineHeight: '20px' }}>Kim Lũ, Sóc Sơn, Hà Nội</Typography>
                        </Box>
                    </Container>
                </Box>

            </Grid>
            <Grid item md={8} bgcolor="white" p={4}  >
                <Box bgcolor="white" pb={8}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#007AE1', fontSize: '25px' }}>Personal Details</Typography>
                </Box>
                <Formik
                    initialValues={{
                        name: 'Vũ Tiến Khoái',
                        email: 'khoaivu2k3@gmail.com',
                        phone: '0324684521',
                        address: 'Kim Lũ, Sóc Sơn, Hà Nội',
                        role: 'Admin'
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Must be a valid email').max(255).required('Địa chỉ Email là bắt buộc'),
                        password: Yup.string().max(255).required('Mật khẩu là bắt buộc')
                    })}
                    onSubmit={handleLoginSubmit}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} >

                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Họ và tên</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập đầy đủ họ và tên"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                    </Stack>

                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Địa chỉ email</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập địa chỉ email"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                    </Stack>

                                </Grid>

                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Số điện thoại</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.phone}
                                            name="phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập số điện thoại"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                    </Stack>

                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Địa chỉ</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.address}
                                            name="address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập địa chỉ"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                    </Stack>

                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Vai trò</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.role}
                                            name="role"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập địa chỉ"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                    </Stack>

                                </Grid>
                            </Grid>
                        </form>
                    )}

                </Formik>
                {/* Nút lưu */}
                <Grid container justifyContent="flex-end" style={{ marginTop: "20px", marginRight: "10px" }}>
                    <Button type="submit" variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    )
}
