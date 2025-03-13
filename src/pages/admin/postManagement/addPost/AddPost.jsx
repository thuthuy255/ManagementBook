import React from 'react'
import useAddPost from '../hook/useAddPost';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import ImageUploader from 'components/uploadImage/ImageUploader';

export default function AddPost() {
    const { formik, posts } = useAddPost();
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
                    <Typography variant="h3" textAlign="center" mb={2}>Thêm bài viết</Typography>
                    <TextField label="Tiêu đề bài viết" fullWidth margin="normal" />
                    <TextField label="Nội dung bài viết" fullWidth margin="normal" />
                    <TextField label="Thể loại bài viết" fullWidth margin="normal" />
                </Box>
                <Box>
                    <Grid item xs={12} md={12} >
                        <ImageUploader
                            images={formik.values.img_src || []}
                            setImages={(newImages) => formik.setFieldValue('img_src', newImages)}
                            multiple={true} // Hoặc false nếu chỉ chọn 1 ảnh
                        />
                    </Grid>
                </Box>
                <Box justifyContent={"center"} display="flex">
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Xác nhận
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
