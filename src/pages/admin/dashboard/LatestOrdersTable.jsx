import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Chip
} from '@mui/material';
import { formatPrice } from 'utils/format';
import { formatDate } from 'utils/format/FormatDate';

const OrderStatus = ({ status }) => {
    let color = 'primary';
    let label = status;

    if (status === 'completed') {
        color = 'success';
        label = 'Hoàn thành';
    } else if (status === 'order') {
        color = 'warning';
        label = 'Đang xử lý';
    } else if (status === 'canceled') {
        color = 'error';
        label = 'Đã hủy';
    }

    return (
        <Chip
            label={label}
            color={color}
            size="small"
            sx={{
                fontWeight: 'bold',
                borderRadius: '6px',
                px: 0.5
            }}
        />
    );
};

export default function LatestOrdersTable({ orders }) {
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Mã đơn</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Sản phẩm</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Giá</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Trạng thái</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Ngày tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.length > 0 ? (
                            orders.map((order) => (
                                <TableRow hover key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontFamily: 'monospace',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            #{order.id.slice(0, 8)}...
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="500">
                                            {order.productName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold">
                                            {formatPrice(order.total)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <OrderStatus status={order.status} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDate(order.createdAt)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa có đơn hàng nào
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

LatestOrdersTable.propTypes = {
    orders: PropTypes.array
};
