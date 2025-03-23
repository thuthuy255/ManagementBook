import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { memo } from 'react';

function CustomTextField({ formik, name, label, type = 'text', multiline = false, disabled = false, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      placeholder={placeholder}
      name={name}
      type={type === 'password' && !showPassword ? 'password' : 'text'}
      multiline={multiline}
      rows={multiline ? 3 : 1}
      value={formik.values[name] || ''}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      disabled={disabled}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end" sx={{ padding: '5px' }}>
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

export default memo(CustomTextField);
