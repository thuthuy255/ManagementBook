import { Box, Button, Card, CardMedia, Grid, TextField, IconButton } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    content: Yup.string().required('Nội dung là bắt buộc'),
    type: Yup.string().required('Loại bài viết là bắt buộc'),
    img_src: Yup.array().min(1, 'Ít nhất một hình ảnh là bắt buộc')
});

export default function UpdatePost({ selectedPost = {}, handleSubmit, handleToggleModalPost }) {
    const fileInputRef = useRef(null);

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Formik
            initialValues={{
                title: selectedPost?.title || '',
                content: selectedPost?.content || '',
                type: selectedPost?.type || '',
                img_src: Array.isArray(selectedPost?.img_src) ? [...selectedPost.img_src] : JSON.parse(selectedPost?.img_src || '[]'),
                createdAt: selectedPost?.createdAt || new Date().toISOString()
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
                        <h2 style={{ margin: 8 }}>Chỉnh sửa bài viết</h2>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field as={TextField} fullWidth label="Tiêu đề" name="title" variant="outlined"
                                            error={touched.title && !!errors.title} helperText={<ErrorMessage name="title" />} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field as={TextField} fullWidth label="Nội dung" name="content" variant="outlined" multiline rows={3}
                                            error={touched.content && !!errors.content} helperText={<ErrorMessage name="content" />} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field as={TextField} fullWidth label="Loại bài viết" name="type" variant="outlined"
                                            error={touched.type && !!errors.type} helperText={<ErrorMessage name="type" />} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Danh sách hình ảnh */}
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    {values.img_src.length > 0 ? (
                                        values.img_src.map((image, index) => (
                                            <Grid item xs={4} key={index}>
                                                <Card sx={{ position: 'relative' }}>
                                                    <CardMedia component="img_src" height="100" image={image} alt={`Ảnh ${index + 1}`} />
                                                    <IconButton
                                                        size="small"
                                                        sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                                                        onClick={() => setFieldValue('img_src', values.img_src.filter((_, i) => i !== index))}
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
                                            onClick={handleFileInputClick}
                                        >
                                            <AddIcon />
                                        </Button>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFieldValue('img_src', [...values.img_src, reader.result]);
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
                            <Button variant="outlined" onClick={handleToggleModalPost}>Hủy</Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

