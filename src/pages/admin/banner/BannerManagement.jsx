import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useBannerManagement from './hook/useBannerManagement';
import { Box, Grid } from '@mui/material';
import Loading from 'components/loading/Loading';

export default function BannerManagement() {
  const { banner, selectedItem, handleEdit, stateComponent, handleListTable, handleToggleModalBook, columns } = useBannerManagement();
  if (stateComponent.loading) {
    return (
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Loading />
      </Grid>
    );
  }
  return <StyledDataGrid rows={banner} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />;
}
