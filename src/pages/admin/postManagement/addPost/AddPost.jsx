import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import CustomTextField from 'components/input/CustomTextField';
import InputSelect from 'components/input/InputSelect';
import ImageUploader from 'components/uploadImage/ImageUploader';
import Loading from 'components/loading/Loading';
import useAddPost from '../hook/useAddPost';

export default function AddPost() {
  const { formik, loading, categoryPost } = useAddPost();

  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Thêm bài viết
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
                <CustomTextField formik={formik} name="title" label="Tiêu đề" />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputSelect
                  label="Loại bài viết"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={categoryPost} // Truyền danh sách loại sách vào
                  error={formik.touched.type && formik.errors.type}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomTextField formik={formik} name="content" label="Nội dung" multiline />
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
