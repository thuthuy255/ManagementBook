import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextField from 'components/input/CustomTextField';
import { showToast } from 'components/notification/CustomToast';
import { getAllCategory } from 'pages/admin/category/services/category.api';
import InputSelect from 'components/input/InputSelect';
import ImageUploader from 'components/uploadImage/ImageUploader';

export default function AddBook() {
  const [categoryBook, setCategoryBook] = useState([]);

  const handleGetListCategory = useCallback(async () => {
    try {
      const response = await getAllCategory();
      if (!response || response?.err !== 0) {
        showToast(response?.mess, 'warning');
        return;
      }
      setCategoryBook(response?.data?.rows);
    } catch (error) {
      showToast('Có lỗi xảy ra' + error, 'error');
    }
  }, []);

  const handleCreateProducts = useCallback(async (values) => {
    console.log('Đây là dữ liệu của bạn');
  }, []);

  useEffect(() => {
    handleGetListCategory();
  }, []);

  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Formik
        initialValues={{
          name: '',
          price: '',
          description: '',
          author: '',
          publisher: '',
          qty: '',
          type: '',
          img_src: []
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Tên sản phẩm không được để trống'),
          price: Yup.number().typeError('Giá phải là số').required('Giá không được để trống'),
          description: Yup.string(),
          author: Yup.string().required('Tác giả không được để trống'),
          publisher: Yup.string(),
          qty: Yup.number().typeError('Số lượng phải là số').required('Số lượng không được để trống'),
          type: Yup.string().required('Loại không được để trống'),
          img_src: Yup.array().required('Ảnh sản phẩm là bắt buộc')
        })}
        onSubmit={handleCreateProducts}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant="h4" gutterBottom mb={0}>
                Thêm sản phẩm
              </Typography>
              <Button type="submit" variant="contained" color="primary" onClick={handleCreateProducts}>
                Xác nhận
              </Button>
            </Grid>

            <Grid container sx={{ flex: 1, minHeight: 0 }}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomTextField name="name" label="Tên sản phẩm" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField name="author" label="Tác giả" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField name="publisher" label="Nhà xuất bản" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField name="price" label="Giá" type="number" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextField name="qty" label="Số lượng" type="number" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputSelect
                      label="Loại sản phẩm"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={categoryBook}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <CustomTextField name="description" label="Mô tả" multiline />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} px={4}>
                <Grid item xs={12} md={12}>
                  <ImageUploader
                    images={values.img_src || []}
                    setImages={(newImages) => setFieldValue('img_src', newImages)}
                    multiple={true}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
