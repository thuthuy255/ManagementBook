import React from 'react';
import useAddUser from '../hook/useAddUser';
import { Button, Container, Grid, Typography } from '@mui/material';
import Loading from 'components/loading/Loading';
import CustomTextField from 'components/input/CustomTextField';
import ImageUploader from 'components/uploadImage/ImageUploader';

export default function AddUser() {
  const { formik, loading } = useAddUser();
  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Thêm nhân viên
        </Typography>

        {loading ? (
          <Loading />
        ) : (
          <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
            Xác nhận
          </Button>
        )}
      </Grid>

      <Grid container sx={{ flex: 1, minHeight: 0 }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="name" label="Tên" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="email" label="Email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="password" label="Mật khẩu" type="password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="passwordConfirm" label="Xác nhận mật khẩu" type="password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="phoneNumber" label="Số điện thoại" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="address" label="Địa chỉ" />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6} px={4}>
          <Grid item xs={12} md={12}>
            <ImageUploader
              images={formik.values.avatar || []}
              setImages={(newImages) => formik.setFieldValue('avatar', newImages)}
              multiple={false}
              error={formik.errors.avatar}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
