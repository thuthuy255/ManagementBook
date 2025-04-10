import { Grid } from '@mui/material';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import React from 'react';
import useListManagementPromotion from './hook/useListManagementPromotion';
import Loading from 'components/loading/Loading';
import StyledDataGrid from 'components/table/StyledDataGrid';
import ModalConfirm from 'components/modal/ModalConfirm';
import ModalPromotionUpdate from './components/ModalPromotionUpdate';

export default function ManagementPromotion() {
  const {
    listPromotion,
    stateComponent,
    columns,
    handleToggleModalDelete,
    handleDeletePromotion,
    handleSelectedIds,
    handleNavigateAdd,
    handleSearchTable,
    searchPromotion,
    isFetchingBook,
    handlePaginationChange,
    selectUpdate,
    handleUpdatePromotion,
    handleToggleModalUpdate
  } = useListManagementPromotion();

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} statusRemoveMultipleItems={false} searchTable={handleSearchTable} />
      </Grid>
      {isFetchingBook ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <div>
          <StyledDataGrid
            rows={listPromotion?.data || []}
            columns={columns}
            onPaginationChange={handlePaginationChange}
            paginationModel={{
              page: searchPromotion.page - 1,
              pageSize: searchPromotion.limit
            }}
            onSelectedIdsChange={handleSelectedIds}
            rowCount={stateComponent.quantity}
            paginationMode="client"
          />
        </div>
      )}

      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeletePromotion} loading={false} />
      <ModalPromotionUpdate
        open={stateComponent.modalUpdate}
        onClose={handleToggleModalUpdate}
        onSave={handleUpdatePromotion}
        promotion={selectUpdate}
      />
    </div>
  );
}
