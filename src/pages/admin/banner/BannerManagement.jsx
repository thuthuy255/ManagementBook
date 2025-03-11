import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useBannerManagement from './hook/useBannerManagement';
import { Box, Grid } from '@mui/material';
import Loading from 'components/loading/Loading';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import ModalConfirm from 'components/modal/ModalConfirm';

export default function BannerManagement() {
  const { banner, selectedItem, handleToggleModalAdd, stateComponent, handleToggleModalDelete, handleSearchTable, columns, handleDeleteBanner } = useBannerManagement();
  return (
    <div>
      <>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
          <HeaderTable onAdd={handleToggleModalAdd} onRemove={handleToggleModalAdd} searchTable={handleSearchTable} />
        </Grid>
        <StyledDataGrid rows={banner} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
        <ModalConfirm
          open={stateComponent.modalDelete}
          loading={stateComponent.loadingConfirm}
          onClose={handleToggleModalDelete}
          onConfirm={handleDeleteBanner}
        />
      </>
    </div>
  );
}

