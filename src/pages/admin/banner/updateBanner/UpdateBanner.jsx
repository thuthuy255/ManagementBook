import { Button, Container, Grid, Typography } from '@mui/material';
import CustomTextField from 'components/input/CustomTextField';
import ImageUploader from 'components/uploadImage/ImageUploader';
import React from 'react';
import useAddBanner from '../hook/useAddBanner';
import InputSelect from 'components/input/InputSelect';

export default function UpdateBanner() {
    const { formik, Banner } = useAddBanner();

    return (
        <Container maxWidth="xl" disableGutters style={{ height: '200px' }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    Thêm sản phẩm
                </Typography>
                <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
                    Xác nhận
                </Button>
            </Grid>

            <Grid container sx={{ flex: 1, minHeight: 0 }}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Cột 1 */}
                            <Grid item xs={12} md={6}>
                                <CustomTextField formik={formik} name="name" label="Tên Banner" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputSelect
                                    label="Trạng thái"
                                    name="active"
                                    value={formik.values.active}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    options={Banner || []} // Kiểm tra nếu Banner không phải danh sách
                                    error={formik.touched.active && formik.errors.active}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <Grid item xs={12} md={6} px={4}>
                    <ImageUploader
                        images={formik.values.img || []}
                        setImages={(newImages) => formik.setFieldValue('img', newImages)}
                        multiple={true} // Hoặc false nếu chỉ chọn 1 ảnh
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
