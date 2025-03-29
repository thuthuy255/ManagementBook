import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useOrderList from './hook/useOrderList';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import StyledDataGrid from 'components/table/StyledDataGrid';
import Loading from 'components/loading/Loading';
import ModalConfirm from 'components/modal/ModalConfirm';

export default function OrderManagement() {
  const {
    stateComponent,
    listOrder,
    isFetchingOrder,
    error,
    refetch,
    handlePaginationChange,
    columns,
    searchOrder,
    setSearchOrder,
    updateStateComponent,
    handleConfirmOrder
  } = useOrderList();

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
          {/* Dropdown filter */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={searchOrder.status} onChange={(e) => setSearchOrder((prev) => ({ ...prev, status: e.target.value }))}>
              <MenuItem value="order">Chờ xử lý</MenuItem>
              <MenuItem value="canceled">Đã hủy</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {isFetchingOrder ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <div>
          <StyledDataGrid
            rows={listOrder?.data || []}
            columns={columns}
            onPaginationChange={handlePaginationChange}
            paginationModel={{
              page: searchOrder.page - 1,
              pageSize: searchOrder.limit
            }}
            rowCount={stateComponent.quantity}
            paginationMode="server"
            getRowId={(row) => row.updatedAt}
          />
        </div>
      )}
      <ModalConfirm
        open={stateComponent.modalConfirm}
        onClose={() => updateStateComponent('modalConfirm', false)}
        onConfirm={handleConfirmOrder}
        loading={false}
      />
    </div>
  );
}
