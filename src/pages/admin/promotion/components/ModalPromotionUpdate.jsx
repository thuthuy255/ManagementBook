import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  code: Yup.string().required('Mã giảm giá không được để trống'),
  discountType: Yup.string().required('Vui lòng chọn loại giảm giá'),
  value: Yup.number().positive('Giá trị giảm phải lớn hơn 0').required('Vui lòng nhập giá trị giảm'),
  minOrderAmount: Yup.number().positive('Giá trị đơn tối thiểu phải lớn hơn 0').required('Vui lòng nhập giá trị tối thiểu'),
  expirationDate: Yup.date().required('Vui lòng chọn ngày hết hạn')
});

function ModalPromotionUpdate({ open, onClose, onSave, promotion }) {
  const formik = useFormik({
    initialValues: promotion,
    validationSchema,
    onSubmit: onSave
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập nhật mã giảm giá</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Mã giảm giá"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('code')}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
          <TextField
            select
            label="Loại giảm giá"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('discountType')}
            error={formik.touched.discountType && Boolean(formik.errors.discountType)}
            helperText={formik.touched.discountType && formik.errors.discountType}
          >
            <MenuItem value="percent">Phần trăm</MenuItem>
            <MenuItem value="cash">Tiền mặt</MenuItem>
          </TextField>
          <TextField
            label="Giá trị giảm"
            type="number"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('value')}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
          <TextField
            label="Giá trị đơn tối thiểu"
            type="number"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('minOrderAmount')}
            error={formik.touched.minOrderAmount && Boolean(formik.errors.minOrderAmount)}
            helperText={formik.touched.minOrderAmount && formik.errors.minOrderAmount}
          />
          <TextField
            label="Ngày hết hạn"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps('expirationDate')}
            error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
            helperText={formik.touched.expirationDate && formik.errors.expirationDate}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Hủy
        </Button>
        <Button onClick={formik.submitForm} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalPromotionUpdate;
