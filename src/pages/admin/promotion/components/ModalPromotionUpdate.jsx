import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  code: Yup.string().required('Mã giảm giá không được để trống'),
  discountType: Yup.string().required('Vui lòng chọn loại giảm giá'),
  value: Yup.number().typeError('Giá trị giảm phải là số').positive('Giá trị giảm phải lớn hơn 0').required('Vui lòng nhập giá trị giảm'),
  minOrderAmount: Yup.number()
    .typeError('Giá trị đơn tối thiểu phải là số')
    .positive('Giá trị đơn tối thiểu phải lớn hơn 0')
    .required('Vui lòng nhập giá trị tối thiểu'),
  expirationDate: Yup.date().required('Vui lòng chọn ngày hết hạn'),
  active: Yup.boolean()
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

function ModalPromotionUpdate({ open, onClose, onSave, promotion }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: promotion?.id || '',
      code: promotion?.code || '',
      discountType: promotion?.discountType || '',
      value: promotion?.value || '',
      minOrderAmount: promotion?.minOrderAmount || '',
      expirationDate: promotion?.expirationDate?.slice(0, 10) || '',
      active: promotion?.active === 1 ? true : false
    },
    validationSchema,
    onSubmit: (values) => {
      // Chuyển active thành 1 hoặc 0 để phù hợp với backend
      const transformed = {
        ...values,
        active: values.active ? 1 : 0
      };
      onSave(transformed);
    }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Cập nhật khuyến mãi
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Mã giảm giá"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />

            <FormControl fullWidth error={formik.touched.discountType && Boolean(formik.errors.discountType)}>
              <InputLabel id="discountType-label">Loại giảm giá</InputLabel>
              <Select
                labelId="discountType-label"
                name="discountType"
                value={formik.values.discountType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Loại giảm giá"
              >
                <MenuItem value="percent">Phần trăm (%)</MenuItem>
                <MenuItem value="fixed">Số tiền cố định</MenuItem>
              </Select>
              <FormHelperText>{formik.touched.discountType && formik.errors.discountType}</FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              label="Giá trị giảm"
              name="value"
              type="number"
              value={formik.values.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.value && Boolean(formik.errors.value)}
              helperText={formik.touched.value && formik.errors.value}
            />

            <TextField
              fullWidth
              label="Giá trị đơn tối thiểu"
              name="minOrderAmount"
              type="number"
              value={formik.values.minOrderAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.minOrderAmount && Boolean(formik.errors.minOrderAmount)}
              helperText={formik.touched.minOrderAmount && formik.errors.minOrderAmount}
            />

            <TextField
              fullWidth
              label="Ngày hết hạn"
              name="expirationDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
              helperText={formik.touched.expirationDate && formik.errors.expirationDate}
            />

            <FormControlLabel
              control={<Switch name="active" checked={formik.values.active} onChange={formik.handleChange} color="primary" />}
              label="Kích hoạt khuyến mãi"
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalPromotionUpdate;
