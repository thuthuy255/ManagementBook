import { Grid } from '@mui/material';
import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';

import useBookList from './hook/useListBook';
import Loading from 'components/loading/Loading';

import ModalConfirm from 'components/modal/ModalConfirm';
import HeaderTable from 'components/table/headerTable/HeaderTable';

function ListPageBook() {
  const {
    books,
    stateComponent,
    columns,
    handleToggleModalDelete,
    handleDeleteProducts,
    handleSelectedIds,
    handleNavigateAdd,
    handleRemoveMultipleItems,
    handleSearchTable
  } = useBookList();
  if (stateComponent.loading) {
    return (
      <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
        <Loading />
      </Grid>
    );
  }
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
      </Grid>
      <StyledDataGrid rows={books} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} onSelectedIdsChange={handleSelectedIds} />
      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeleteProducts} loading={false} />
    </div>
  );
}

export default memo(ListPageBook);
