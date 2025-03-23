import { Grid } from '@mui/material';
import React from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import Loading from 'components/loading/Loading';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import ModalConfirm from 'components/modal/ModalConfirm';
import useListUser from './hook/useListUser';

export default function ManagementUser() {
  const {
    dataListUser,
    stateComponent,
    handleToggleModalDelete,
    handleSearchTable,
    handleRemoveMultipleItems,
    columns,
    handleDelete,
    isFetchingPost,
    handleNavigateAdd,
    handleSelectedIds,
    searchBody,
    handlePaginationChange,
    handleLockUser,
    handleUpdateState
  } = useListUser();
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable onAdd={handleNavigateAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
      </Grid>
      {isFetchingPost ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <div>
          {dataListUser?.data?.rows?.length > 0 && (
            <StyledDataGrid
              rows={dataListUser?.data?.rows || []}
              columns={columns}
              onPaginationChange={handlePaginationChange}
              paginationModel={{
                page: searchBody.page - 1,
                pageSize: searchBody.limit
              }}
              onSelectedIdsChange={handleSelectedIds}
              rowCount={stateComponent.quantity}
              paginationMode="server"
            />
          )}

          <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDelete} loading={false} />
          <ModalConfirm
            open={stateComponent.modalUnLockUser}
            onClose={() => handleUpdateState('modalUnLockUser', false)}
            onConfirm={() => handleLockUser('unlock')}
            loading={false}
          />
          <ModalConfirm
            open={stateComponent.modalLockUser}
            onClose={() => handleUpdateState('modalLockUser', false)}
            onConfirm={() => handleLockUser('lock')}
            loading={false}
          />
        </div>
      )}
    </>
  );
}
