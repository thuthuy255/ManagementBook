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
    handleSearchTable,
    searchProducts,
    handlePaginationChange,
    handleToggleModalWarring
  } = useBookList();

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleToggleModalWarring} searchTable={handleSearchTable} />
      </Grid>
      {stateComponent.loading ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <StyledDataGrid
          rows={books}
          columns={columns}
          onPaginationChange={handlePaginationChange}
          paginationModel={{
            page: searchProducts.page - 1,
            pageSize: searchProducts.limit
          }}
          onSelectedIdsChange={handleSelectedIds}
          rowCount={stateComponent.quantity}
          paginationMode="server"
        />
      )}

      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeleteProducts} loading={false} />
      <ModalConfirm
        open={stateComponent.modalWarring}
        onClose={handleToggleModalWarring}
        onConfirm={handleRemoveMultipleItems}
        loading={false}
      />
    </div>
  );
}

export default memo(ListPageBook);
