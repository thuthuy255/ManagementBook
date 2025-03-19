import React, { useEffect } from 'react'
import useUpdateBanner from '../hook/useUpdateBanner';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ImageUploader from 'components/uploadImage/ImageUploader';
import Loading from 'components/loading/Loading';
import { useParams } from 'react-router';
import { getAllBanner } from '../services/banner.api';
import InputSelect from 'components/input/InputSelect';

export default function UpdateBanner() {

    const { formik, loading, statusOptions } = useUpdateBanner();


    return (
        <Box
            sx={{
                // width: "100%",           // Đảm bảo chiều rộng full
                minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 220px)' },
                backgroundImage: "url('https://img.freepik.com/free-photo/creative-composition-with-different-books_23-2148851035.jpg?t=st=1741876625~exp=1741880225~hmac=f7cc2644ad029ded37764197ab98493ef367eb3734ae889c8e9fd21811fe81de&w=996')",

                backgroundSize: "cover", // Đảm bảo ảnh phủ full box
                backgroundPosition: "center",
                display: "flex",         // Dùng flexbox
                justifyContent: "center",
                alignItems: "center",

            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(253, 253, 253, 0.93)", // Làm mờ nền form
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: "30%",
                }}
            >
                <Box>
                    <Typography variant="h3" textAlign="center" mb={2}>Sửa Banner</Typography>
                    <TextField
                        label="Tên Banner"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formik.values.name || ''} // Đảm bảo luôn có giá trị
                        onChange={formik.handleChange}
                        style={{ marginBottom: '20px' }}
                    />

                    <FormControl fullWidth error={formik.touched.active && Boolean(formik.errors.active)} >
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            name="active"
                            value={formik.values.active}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {statusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.active && formik.errors.active}</FormHelperText>
                    </FormControl>


                </Box>
                <Box>
                    <Grid item xs={12} md={12} >
                        <ImageUploader
                            images={formik.values.img || []}
                            setImages={(newImages) => formik.setFieldValue('img', newImages)}
                            multiple={true} // Hoặc false nếu chỉ chọn 1 ảnh
                        />
                    </Grid>
                </Box>
                <Box justifyContent={"center"} display="flex" marginTop={5}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
                            Xác nhận
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
