import { Box, Button, Card, CardMedia, Grid, TextField, IconButton } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên sách là bắt buộc'),
  price: Yup.number().typeError('Giá phải là số').positive('Giá phải lớn hơn 0').required('Giá là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  author: Yup.string().required('Tác giả là bắt buộc'),
  publisher: Yup.string().required('Nhà xuất bản là bắt buộc'),
  qty: Yup.number()
    .typeError('Số lượng phải là số')
    .integer('Số lượng phải là số nguyên')
    .min(1, 'Số lượng ít nhất là 1')
    .required('Số lượng là bắt buộc')
});

export default function UpdateBook({ selectedBook, handleSubmit, handleToggleModalBook }) {
  const fileInputRef = useRef(null);
  const handlefileInputRef = () => {
    fileInputRef.current.click();
  }
  return (
    <Formik
      initialValues={{
        name: selectedBook.name || '',
        price: selectedBook.price || '',
        description: selectedBook.description || '',
        author: selectedBook.author || '',
        publisher: selectedBook.publisher || '',
        qty: selectedBook.qty || '',
        images: Array.isArray(selectedBook.images) ? [...selectedBook.images] : JSON.parse(selectedBook.img_src || '[]')
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2
            }}
          >
            <h2 style={{ margin: 8 }}>Chỉnh sửa sách</h2>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field as={TextField} fullWidth label="Tên sách" name="name" variant="outlined"
                      error={touched.name && !!errors.name} helperText={<ErrorMessage name="name" />} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} fullWidth label="Giá" name="price" type="number" variant="outlined"
                      error={touched.price && !!errors.price} helperText={<ErrorMessage name="price" />} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} fullWidth label="Số lượng" name="qty" type="number" variant="outlined"
                      error={touched.qty && !!errors.qty} helperText={<ErrorMessage name="qty" />} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} fullWidth label="Mô tả" name="description" variant="outlined" multiline rows={3}
                      error={touched.description && !!errors.description} helperText={<ErrorMessage name="description" />} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} fullWidth label="Tác giả" name="author" variant="outlined"
                      error={touched.author && !!errors.author} helperText={<ErrorMessage name="author" />} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} fullWidth label="Nhà xuất bản" name="publisher" variant="outlined"
                      error={touched.publisher && !!errors.publisher} helperText={<ErrorMessage name="publisher" />} />
                  </Grid>
                </Grid>
              </Grid>

              {/* Danh sách hình ảnh */}
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {values.images.length > 0 ? (
                    values.images.map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <Card sx={{ position: 'relative' }}>
                          <CardMedia component="img" height="100" image={image} alt={`Ảnh ${index + 1}`} />
                          <IconButton
                            size="small"
                            sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                            onClick={() => setFieldValue('images', values.images.filter((_, i) => i !== index))}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <p>Không có ảnh nào</p>
                  )}

                  {/* Nút thêm ảnh */}
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={handlefileInputRef}
                    >
                      <AddIcon />
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFieldValue('images', [...values.images, reader.result]);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button type="submit" variant="contained" color="primary">Lưu</Button>
              <Button variant="outlined" onClick={handleToggleModalBook}>Hủy</Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
