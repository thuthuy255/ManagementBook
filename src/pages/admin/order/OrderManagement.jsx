import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
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
    handleSearchTable,
    updateStateComponent,
    handleConfirmOrder,
    handleCancelOrder
  } = useOrderList();

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable statusAdd={false} searchTable={handleSearchTable} />
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
      {/* <ModalConfirm
        open={stateComponent.modalCancel}
        onClose={() => updateStateComponent('modalCancel', false)}
        onConfirm={handleCancelOrder}
        loading={false}
      /> */}
    </div>
  );
}
