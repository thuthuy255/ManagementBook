import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, IconButton, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material'
import AnimateButton from 'components/@extended/AnimateButton';
import { Formik } from 'formik'
import FirebaseSocial from 'pages/authentication/auth-forms/FirebaseSocial';
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import CreateIcon from '@mui/icons-material/Create';
import * as Yup from 'yup';

export default function Profile() {
    const initialAvatar = "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/464101933_1589786078272232_287137893144228374_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFZ_F4zxmKCgXkHtnzM65KuTZS2vXvykOVNlLa9e_KQ5W3tmi74wWkCOrXbcUjO2U_zMRjbKLnJbDRcQC0AvYom&_nc_ohc=fntF45CyjwoQ7kNvgGAS3oJ&_nc_oc=AdjDVcDqezTvMJC-iPckFI8_oIdle2kd3kIyJL2D8GUiooruud6pGDGffvYfg8TTx9k&_nc_zt=24&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AbrzYHpfX9HXEkl5D1Xz90n&oh=00_AYEx_Qw1bOzv_ic1HnccGEMa8XZOQEhdPwT6edtFMJEGug&oe=67D2F90F";

    const [avatar, setAvatar] = useState(initialAvatar);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };
    return (
        <Container maxWidth='sx' sx={{ marginTop: '20px' }}>
            <Grid container gap={10}   >
                <Grid item md={3} xs={12} bgcolor="white" p={4} sx={{
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
                            sx={{ width: 300, height: 300 }}>
                        </Box>
                        <Box>
                            <Box>
                                <Typography variant="h3" >Vũ Tiến Khoái </Typography>
                                <Typography gutterBottom sx={{ color: '#007AE1', fontSize: '20px', marginBottom: '20px' }}>Admin </Typography>
                            </Box>
                            <Container  >
                                <Box display="flex" gap={1}>
                                    <MailOutlineIcon />
                                    <Typography gutterBottom sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>Khoaivu2k3@gmail.com</Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <PhoneIcon />
                                    <Typography gutterBottom sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>0324684521</Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <MapIcon />
                                    <Typography variant="span" sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>Kim Lũ, Sóc Sơn, Hà Nội</Typography>
                                </Box>
                            </Container>
                        </Box>

                    </Box>

                </Grid>
                <Grid item md={7} bgcolor="white" p={4}  >
                    <Box bgcolor="white" pb={3}>
                        <Typography variant="h4" gutterBottom sx={{ color: '#007AE1', fontSize: '25px' }}>Personal Details</Typography>
                    </Box>
                    <Formik
                        initialValues={{
                            name: 'Vũ Tiến Khoái',
                            email: 'khoaivu2k3@gmail.com',
                            phone: '0324684521',
                            address: 'Kim Lũ, Sóc Sơn, Hà Nội',
                            role: 'Admin',
                            avatar: initialAvatar
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Địa chỉ Email là bắt buộc'),
                            name: Yup.string().max(255).required('Họ và tên là bắt buộc'),
                            phone: Yup.number().required('Số điện thoại là bắt buộc'),
                            address: Yup.string().max(255).required('Địa chỉ là bắt buộc'),

                        })}
                    // onSubmit={handleLoginSubmit}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid item xs={6} pb={6}>
                                    <Stack spacing={1}>
                                        <Box sx={{ position: "relative", display: "inline-block" }}>
                                            <Box
                                                component="img"
                                                src={avatar}
                                                alt="Avatar"
                                                sx={{ width: 170, height: 170, borderRadius: "50%", border: "2px solid #ddd" }}

                                            />
                                            {/* Nút upload ảnh */}
                                            <IconButton
                                                component="label"
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 5,
                                                    left: 130,
                                                    backgroundColor: "white",
                                                    boxShadow: 2,
                                                    borderRadius: "50%",
                                                    width: 30,
                                                    height: 30,
                                                    p: 0.5,
                                                    "&:hover": { backgroundColor: "#f0f0f0" },
                                                }}
                                            >
                                                <CreateIcon sx={{ fontSize: 16 }} />
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </IconButton>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid container spacing={3} pb={6}>
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
        </Container>
    )
}
