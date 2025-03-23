import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import { Grid } from '@mui/material';
import Loading from 'components/loading/Loading';
import usePostList from './hook/usePostList';
import ModalConfirm from 'components/modal/ModalConfirm';
import HeaderTable from 'components/table/headerTable/HeaderTable';

function ListPostManagement() {
  const {
    posts,
    stateComponent,
    columns,
    handleDelete,
    handleToggleModalDelete,
    isFetchingPost,
    handleNavigateAdd,
    handleRemoveMultipleItems,
    handleSearchTable,
    handleSelectedIds,
    searchBody,
    handlePaginationChange
  } = usePostList();
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
          <StyledDataGrid
            rows={posts?.data?.rows || []}
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

          <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDelete} loading={false} />
        </div>
      )}
    </>
  );
}

export default memo(ListPostManagement);
