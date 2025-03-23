import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export default function UpdateUser() {
  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Chỉnh sửa thông tin nhân viên
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
                <CustomTextField formik={formik} name="title" label="Tiêu đề" disabled={true} />
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
