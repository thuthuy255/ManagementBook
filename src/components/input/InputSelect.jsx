import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { memo } from 'react';

function InputSelect({ label, name, value, onChange, onBlur, options, error }) {
  return (
    <FormControl fullWidth error={Boolean(error)} sx={{ marginTop: '16px', marginBottom: '16px' }}>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        MenuProps={{
          PaperProps: {
            style: {
              height: '120px', // Giới hạn chiều cao dropdown
              overflowY: 'auto' // Hiển thị thanh cuộn nếu quá dài
            }
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.type}>
            {option[name]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default memo(InputSelect);
