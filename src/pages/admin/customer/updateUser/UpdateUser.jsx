import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Loading from 'components/loading/Loading';
import useUpdateUser from '../hook/useUpdateUser';
import { useSearchParams } from 'react-router-dom';
import CustomTextField from 'components/input/CustomTextField';
import ImageUploader from 'components/uploadImage/ImageUploader';

export default function UpdateUser() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const { formik, loading, dataDetailUser } = useUpdateUser(userId);
  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Thông tin khách hàng
        </Typography>

        <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
          Xác nhận
        </Button>
      </Grid>
      {loading ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
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
                  <CustomTextField formik={formik} name="phoneNumber" label="Số điện thoại" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} name="address" label="Địa chỉ" />
                </Grid>
                <Grid item container md={12}>
                  <Typography gutterBottom mb={0} md={12}>
                    Đặt mật khẩu mới
                  </Typography>

                  <Grid item xs={12} md={12}>
                    <CustomTextField formik={formik} name="password" label="Mật khẩu" type="password" />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={6} px={2}>
            <Grid item xs={12} md={12}>
              {formik.values.avatar && (
                <ImageUploader
                  images={formik.values.avatar || []}
                  setImages={(newImages) => formik.setFieldValue('avatar', newImages)}
                  multiple={false}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
