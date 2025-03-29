import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';
import { formatPrice } from 'utils/format';
import Dot from 'components/@extended/Dot';
import { getAllOrdersAdmin } from 'services/clients/product';

const headCells = [
  { id: 'tracking_no', align: 'left', label: 'STT' },
  { id: 'name', align: 'left', label: 'Tên Sản Phẩm' },
  { id: 'quantity', align: 'right', label: 'Số Lượng' },
  { id: 'status', align: 'left', label: 'Trạng Thái' },
  { id: 'total_price', align: 'right', label: 'Tổng Số Tiền' }
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = { order: PropTypes.string, orderBy: PropTypes.string };

function OrderStatus({ status }) {
  const statusMap = {
    0: { color: 'warning', title: 'Đang Chờ Xử Lý' },
    1: { color: 'success', title: 'Đã thanh toán' },
    2: { color: 'error', title: 'Đã Hủy' }
  };

  const { color, title } = statusMap[status] || { color: 'primary', title: 'Không xác định' };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

OrderStatus.propTypes = { status: PropTypes.number };

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const order = 'asc';
  const orderBy = 'tracking_no';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersAdmin();
        console.log(response);
        setOrders(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <Box>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {orders?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Link color="secondary">{index + 1}</Link>
                </TableCell>
                <TableCell>{row.products[0].name}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell>
                  <OrderStatus status='0' />
                </TableCell>
                <TableCell align="right">{formatPrice(row.total || 0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
