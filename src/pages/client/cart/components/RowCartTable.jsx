import { Box, Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import React, { memo } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImage } from 'utils/getImage';
import { formatPrice } from 'utils/format';

function RowCartTable({ data, handleSetCountMinus, handleSetCountPlus }) {
  const { id, price, name } = data.product;
  const { total, qty } = data;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Checkbox />
      </TableCell>
      <TableCell sx={{ display: 'flex' }}>
        <img src={getImage(data?.product)} width={100} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '7px' }}>
          <Typography>{name}</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>{formatPrice(price)}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '1px 5px',
            width: 'fit-content',
            gap: '15px'
          }}
        >
          <Box
            sx={{
              cursor: 'pointer',
              color: '#777',
              ':hover': { color: 'black' }
            }}
            onClick={() => handleSetCountMinus(id, 1)}
          >
            <RemoveIcon sx={{ width: '15px' }} />
          </Box>

          <Typography variant="h5" fontWeight="bold" fontSize={17} mb={0.5}>
            {qty}
          </Typography>

          <Box
            sx={{
              cursor: 'pointer',
              color: '#777',
              ':hover': { color: 'black' }
            }}
            onClick={() => handleSetCountMinus(id, -1)}
          >
            <AddIcon sx={{ width: '15px' }} />
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ color: '#C92127', fontWeight: 'bold' }}>{formatPrice(total)}</TableCell>
      <TableCell>
        <DeleteIcon />
      </TableCell>
    </TableRow>
  );
}

export default memo(RowCartTable);
