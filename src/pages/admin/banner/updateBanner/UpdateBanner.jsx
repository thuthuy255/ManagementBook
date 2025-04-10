import React from 'react';
import useUpdateBanner from '../hook/useUpdateBanner';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ImageUploader from 'components/uploadImage/ImageUploader';
import Loading from 'components/loading/Loading';
export default function UpdateBanner() {
  const { formik, isFetchingBanner } = useUpdateBanner();

  return (
    <Box>
      <Box>
        <Box>
          <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h4" gutterBottom mb={0}>
              Sửa thông tin banner
            </Typography>

            <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
              Xác nhận
            </Button>
          </Grid>
          {isFetchingBanner ? (
            <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
              <Loading />
            </Grid>
          ) : (
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
                    name="active"
                    value={formik.values.active || ''} // Đảm bảo có giá trị
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'1'}>Hiển thị</MenuItem>
                    <MenuItem value={'0'}>Không hiển thị</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} px={4}>
                <Grid item xs={12} md={12}>
                  <ImageUploader
                    images={formik.values.img || []}
                    setImages={(newImages) => formik.setFieldValue('img', newImages)}
                    multiple={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
