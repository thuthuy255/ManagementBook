import { Grid } from '@mui/material';
import Loading from 'components/loading/Loading';
import StyledDataGrid from 'components/table/StyledDataGrid';
import React, { memo } from 'react';
import useListBanner from './hook/useListBanner';
import ModalConfirm from 'components/modal/ModalConfirm';
import HeaderTable from 'components/table/headerTable/HeaderTable';

function ListPageBanner() {
  const {
    stateComponent,
    columns,
    handleDeleteBanner,
    handleToggleModalDelete,
    handleSearchTable,
    handleNavigateAdd,
    isFetchingBanner,
    dataBanner,
    handlePaginationChange,
    searchParams,
    handleSelectedIds,
    handleFilterBanner
  } = useListBanner();
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <HeaderTable
          onAdd={handleNavigateAdd}
          statusRemoveMultipleItems={false}
          searchTable={handleSearchTable}
          showDropdown={true}
          dataDropdown={[
            { label: 'Đang hoạt động', value: 1 },
            { label: 'Ngừng hoạt động', value: 0 }
          ]}
          dropdownValue={searchParams.active}
          onChangeDropdown={handleFilterBanner}
        />
      </Grid>
      {isFetchingBanner ? (
        <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <div>
          <StyledDataGrid
            rows={dataBanner?.data?.rows || []}
            columns={columns}
            onPaginationChange={handlePaginationChange}
            paginationModel={{
              page: searchParams.page - 1,
              pageSize: searchParams.limit
            }}
            onSelectedIdsChange={handleSelectedIds}
            rowCount={stateComponent.quantity}
            paginationMode="server"
          />
        </div>
      )}

      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeleteBanner} loading={false} />
    </div>
  );
}
export default memo(ListPageBanner);
