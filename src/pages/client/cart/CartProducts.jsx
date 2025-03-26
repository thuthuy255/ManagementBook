import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import LeftPayCart from './components/LeftPayCart';
import useListCart from './hook/useListCart';
import Loading from 'components/loading/Loading';
import RowCartTable from './components/RowCartTable';

export default function CartProducts() {
  const { count, handleSetCountPlus, handleSetCountMinus, listCart, isLoading } = useListCart();
  return (
    <Grid container pt={3} display={'flex'} style={{ minHeight: 'calc(100vh - 100px)', margin: '0 auto', width: '80vw' }}>
      {isLoading ? (
        <Grid height={'50vh'}>
          <Loading />
        </Grid>
      ) : (
        <Grid container>
          <Typography variant="h6" sx={{ fontSize: '18px' }} pb={2}>
            GIỎ HÀNG ({listCart?.data?.orders?.length} sản phẩm)
          </Typography>

          <Grid container spacing={1}>
            <Grid item md={8}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#fff' }}>
                    <TableRow>
                      <TableCell sx={{ width: 100, borderBottom: 'none' }}>{/* <Checkbox /> */}</TableCell>
                      <TableCell sx={{ width: '50%', borderBottom: 'none' }}>Tên sản phẩm</TableCell>
                      <TableCell sx={{ width: 100, borderBottom: 'none' }}>Số lượng </TableCell>
                      <TableCell sx={{ width: 100, borderBottom: 'none' }}>Thành tiền </TableCell>
                      <TableCell sx={{ width: 100, borderBottom: 'none' }}> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ backgroundColor: '#fff' }}>
                    {listCart?.data?.orders?.map((item, index) => (
                      <RowCartTable
                        key={index}
                        data={item}
                        handleSetCountMinus={handleSetCountMinus}
                        handleSetCountPlus={handleSetCountPlus}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <LeftPayCart count={listCart?.data?.alltotal} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
