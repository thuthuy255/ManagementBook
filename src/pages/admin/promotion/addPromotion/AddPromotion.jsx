import { Button, Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import useAddPromotion from '../hook/useAddPromotion';
import CustomTextField from 'components/input/CustomTextField';

export default function AddPromotion() {
  const { formik } = useAddPromotion();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
        <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h4" gutterBottom mb={0}>
            Thêm mã giảm giá
          </Typography>

          <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
            Xác nhận
          </Button>
        </Grid>

        <Grid container sx={{ flex: 1, minHeight: 0 }}>
          <Grid item xs={12} md={12}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {/* Cột 1 */}
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} name="code" label="Mã giảm giá" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} name="value" label="Giá trị giảm (%)" type="number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextField formik={formik} name="minOrderAmount" label="Giá trị đơn hàng tối thiểu" type="number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loại giảm giá</InputLabel>
                    <Select
                      name="discountType"
                      value={formik.values.discountType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="percent">Phần trăm</MenuItem>
                      <MenuItem value="fixed">Cố định</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Ngày hết hạn"
                    value={formik.values.expirationDate}
                    onChange={(newValue) => formik.setFieldValue('expirationDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select name="active" value={formik.values.active} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                      <MenuItem value={true}>Kích hoạt</MenuItem>
                      <MenuItem value={false}>Chưa kích hoạt</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
