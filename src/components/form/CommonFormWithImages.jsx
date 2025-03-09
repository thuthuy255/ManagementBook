import { Box, Button, Card, CardMedia, Grid, TextField, IconButton } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export default function CommonFormWithImages({
  title,
  formFields,
  initialValues,
  validationSchema,
  handleSubmit,
  handleCancel,
  multiple = false // Thêm option chọn nhiều hoặc 1 ảnh
}) {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
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
            <h2 style={{ marginBottom: '20px', marginTop: 0 }}>{title}</h2>
            <Grid container spacing={3}>
              {/* Form bên trái */}
              <Grid item xs={5}>
                <Grid container spacing={2}>
                  {formFields.map(({ name, label, type }) => (
                    <Grid item xs={12} key={name}>
                      <Field
                        as={TextField}
                        fullWidth
                        label={label}
                        name={name}
                        variant="outlined"
                        type={type || 'text'}
                        error={touched[name] && !!errors[name]}
                        helperText={<ErrorMessage name={name} />}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Hình ảnh bên phải */}
              <Grid item xs={7}>
                <Grid container spacing={2}>
                  {values.images.length > 0 &&
                    values.images.map((file, index) => (
                      <Grid item xs={4} key={index}>
                        <Card sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={URL.createObjectURL(file)} // Hiển thị ảnh từ file
                            alt={`Ảnh ${index + 1}`}
                          />
                          {/* <CardMedia
                            component="img"
                            height="100"
                            image={typeof file === 'string' ? file : URL.createObjectURL(file)}
                            alt={`Ảnh ${index + 1}`}
                          /> */}
                          <IconButton
                            size="small"
                            sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                            onClick={() =>
                              setFieldValue(
                                'images',
                                values.images.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </Card>
                      </Grid>
                    ))}

                  {/* Nút thêm ảnh */}
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={handleFileInputClick}
                    >
                      <AddIcon />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      multiple={multiple} // Chọn nhiều ảnh nếu multiple = true
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          setFieldValue('images', multiple ? [...values.images, ...files] : [files[0]]);
                        }
                      }}
                    />
                    {touched.images && errors.images && <p style={{ color: 'red', marginTop: 5 }}>{errors.images}</p>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button variant="outlined" onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Lưu
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
