import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project import
import SalesChart from './SalesChart';

// sales report status
const status = [
  {
    value: 'today',
    label: 'Hôm nay'
  },
  {
    value: 'month',
    label: 'Tháng'
  },
  {
    value: 'year',
    label: 'Năm'
  }
];

// ==============================|| DEFAULT - SALES REPORT ||============================== //

export default function SaleReportCard() {
  const [value, setValue] = useState('today');

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Báo cáo bán hàng</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="standard-select-currency"
            size="small"
            select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <SalesChart />
    </>
  );
}
