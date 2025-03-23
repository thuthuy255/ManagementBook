import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import ImageUploader from 'components/uploadImage/ImageUploader';
import React from 'react';
import useAddBanner from '../hook/useAddBanner';
import Loading from 'components/loading/Loading';

export default function AddBanner() {
  const { formik, loading } = useAddBanner();
  return (
    <Box
      sx={
        {
          // backgroundImage:
          //   "url('https://img.freepik.com/free-photo/creative-composition-with-different-books_23-2148851035.jpg?t=st=1741876625~exp=1741880225~hmac=f7cc2644ad029ded37764197ab98493ef367eb3734ae889c8e9fd21811fe81de&w=996')",
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // display: 'flex', // Dùng flexbox
          // justifyContent: 'center',
          // alignItems: 'center'
        }
      }
    >
      <Box
        sx={
          {
            //   backgroundColor: 'rgba(253, 253, 253, 0.93)', // Làm mờ nền form
            //   padding: 4,
            //   borderRadius: 2
            //   boxShadow: 3,
            //   width: '30%'
          }
        }
      >
        <Box>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h4" gutterBottom mb={0}>
              Thêm mới banner
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
            <Grid container spacing={2} item xs={12} md={6}>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Tên Banner"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={formik.values.name || ''} // Đảm bảo luôn có giá trị
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  select
                  label="Trạng thái"
                  fullWidth
                  margin="normal"
                  name="status"
                  value={formik.values.status || ''} // Đảm bảo có giá trị
                  onChange={formik.handleChange}
                >
                  <MenuItem value="active">Hiển thị</MenuItem>
                  <MenuItem value="inactive">Không hiển thị</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} px={4}>
              <Grid item xs={12} md={12}>
                <ImageUploader
                  images={formik.values.img || []}
                  setImages={(newImages) => formik.setFieldValue('img', newImages)}
                  multiple={true} // Hoặc false nếu chỉ chọn 1 ảnh
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
