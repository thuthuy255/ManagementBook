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
    Avatar,
    Stack
} from '@mui/material';
import { formatDate } from 'utils/format/FormatDate';

export default function LatestUsersTable({ users }) {
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Người dùng</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Liên hệ</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: 'grey.50' }}>Ngày tham gia</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <TableRow hover key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    fontSize: '0.875rem',
                                                    bgcolor: 'primary.light',
                                                    color: 'primary.main',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {user.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" fontWeight="500">
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                            {user.phoneNumber || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDate(user.createdAt)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa có người dùng nào
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

LatestUsersTable.propTypes = {
    users: PropTypes.array
};
