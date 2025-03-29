import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import CreateIcon from '@mui/icons-material/Create';
import CustomTextField from 'components/input/CustomTextField';
import useProfiles from 'pages/admin/profile/hook/useProfile';

export default function Profile() {


    const { infoUser, formik, avatar, setAvatar, handleImageChange } = useProfiles();

    return (
        <Container maxWidth="lg" style={{ backgroundColor: '#fff', padding: '30px' }}>
            <Typography variant="h4" gutterBottom mb={5}>
                Thông tin cá nhân
            </Typography>
            <Grid container gap={10}>
                <Grid
                    item
                    md={3}
                    xs={12}
                    bgcolor="white"
                    px={4}
                    py={0}
                    sx={{
                        textAlign: 'center',
                        borderRadius: 5
                    }}
                >
                    <Box pb={8}>
                        <Box p={2} component="img" src={infoUser.avatar || avatar} alt="Example" sx={{ width: 150, height: 150 }}></Box>
                        <Box>
                            <Box>
                                <Typography variant="h3">{infoUser?.name} </Typography>

                            </Box>
                            <Container>
                                <Box display="flex" gap={1}>
                                    <MailOutlineIcon />
                                    <Typography gutterBottom sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>
                                        {infoUser?.email}{' '}
                                    </Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <PhoneIcon />
                                    <Typography gutterBottom sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>
                                        {infoUser?.phoneNumber || 'Chưa cập nhật'}{' '}
                                    </Typography>
                                </Box>
                                <Box display="flex" gap={1}>
                                    <MapIcon />
                                    <Typography variant="span" sx={{ color: '#6C757D', fontSize: '15px', marginBottom: '20px' }}>
                                        {infoUser?.address || 'Chưa cập nhật'}{' '}
                                    </Typography>
                                </Box>
                            </Container>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={8} bgcolor="white" px={4} sx={{ borderRadius: 5 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Box
                                        component="img"
                                        src={avatar || infoUser.avatar}
                                        alt="Avatar"
                                        sx={{ width: 150, height: 150, borderRadius: '50%', border: '2px solid #ddd' }}
                                    />

                                    <IconButton
                                        component="label"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 120,
                                            backgroundColor: 'white',
                                            boxShadow: 2,
                                            borderRadius: '50%',
                                            width: 30,
                                            height: 30,

                                            '&:hover': { backgroundColor: '#f0f0f0' }
                                        }}
                                    >
                                        <CreateIcon sx={{ fontSize: 16 }} />
                                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField formik={formik} name="email" label="Tên" placeholder={'Nhập địa chỉ email'} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField formik={formik} name="name" label="Tên" placeholder={'Nhập tên người dùng'} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField formik={formik} name="address" label="Địa chỉ" placeholder={'Nhập địa chỉ'} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField formik={formik} name="phoneNumber" label="Số điện thoại" placeholder={'Số điện thoại'} />
                            </Grid>

                        </Grid>
                        <Grid container justifyContent="flex-end" style={{ marginTop: '20px', marginRight: '10px' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Cập nhật
                            </Button>
                        </Grid>
                    </form>
                    {/* <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                address: '',
                role: '',
                avatar: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Địa chỉ Email là bắt buộc'),
                name: Yup.string().max(255).required('Họ và tên là bắt buộc'),
                phone: Yup.number().required('Số điện thoại là bắt buộc'),
                address: Yup.string().max(255).required('Địa chỉ là bắt buộc')
              })}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Box
                          component="img"
                          src={infoUser.avatar || avatar}
                          alt="Avatar"
                          sx={{ width: 150, height: 150, borderRadius: '50%', border: '2px solid #ddd' }}
                        />
  
                        <IconButton
                          component="label"
                          sx={{
                            position: 'absolute',
                            bottom: 5,
                            left: 130,
                            backgroundColor: 'white',
                            boxShadow: 2,
                            borderRadius: '50%',
                            width: 30,
                            height: 30,
                            p: 0.5,
                            '&:hover': { backgroundColor: '#f0f0f0' }
                          }}
                        >
                          <CreateIcon sx={{ fontSize: 16 }} />
                          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
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
                          value={infoUser.name}
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
                          value={infoUser.email}
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
                          value={infoUser.phoneNumber}
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
                          value={infoUser.address}
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
                          disabled={true}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik> */}
                    {/* Nút lưu */}
                    {/* <Grid container justifyContent="flex-end" style={{ marginTop: '20px', marginRight: '10px' }}>
              <Button type="submit" variant="contained" color="primary">
                Cập nhật
              </Button>
            </Grid> */}
                </Grid>
            </Grid>
        </Container >
    );
}
