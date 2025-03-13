import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import CustomTextField from 'components/input/CustomTextField';
import InputSelect from 'components/input/InputSelect';
import ImageUploader from 'components/uploadImage/ImageUploader';
import useAddBook from '../hook/useAddBook';
import Loading from 'components/loading/Loading';
import ModalConfirm from 'components/modal/ModalConfirm';

export default function AddBook() {
  const { formik, categoryBook, loading } = useAddBook();

  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Thêm sản phẩm
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
              {/* Cột 1 */}
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="name" label="Tên sản phẩm" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="author" label="Tác giả" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="publisher" label="Nhà xuất bản" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="price" label="Giá" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="qty" label="Số lượng" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputSelect
                  label="Loại sản phẩm"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={categoryBook} // Truyền danh sách loại sách vào
                  error={formik.touched.type && formik.errors.type}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomTextField formik={formik} name="description" label="Mô tả" multiline />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6} px={4}>
          <Grid item xs={12} md={12}>
            <ImageUploader
              images={formik.values.img_src || []}
              setImages={(newImages) => formik.setFieldValue('img_src', newImages)}
              multiple={true}
              error={formik.errors.img_src}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
