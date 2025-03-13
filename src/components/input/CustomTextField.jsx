import { TextField } from '@mui/material';
import React, { memo } from 'react';

function CustomTextField({ formik, name, label, type = 'text', multiline = false }) {
  return (
    <TextField
      fullWidth={true}
      margin="normal"
      label={label}
      name={name}
      type={type}
      multiline={multiline}
      rows={multiline ? 3 : 1}
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
}

export default memo(CustomTextField);
