import { Grid } from '@mui/material';
import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';

import useBookList from './hook/useListBook';
import Loading from 'components/loading/Loading';

import ModalConfirm from 'components/modal/ModalConfirm';

function ListPageBook() {
  const { books, stateComponent, columns, handleToggleModalDelete, handleDeleteProducts } = useBookList();
  if (stateComponent.loading) {
    return (
      <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
        <Loading />
      </Grid>
    );
  }
  return (
    <div>
      <StyledDataGrid rows={books} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeleteProducts} loading={false} />
    </div>
  );
}

export default memo(ListPageBook);
