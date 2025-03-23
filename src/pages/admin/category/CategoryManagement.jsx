import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useCategoryManagement from './hook/useCategoryManagement';
import { Grid, Modal } from '@mui/material';
import UpdateCategory from './updateCategory/UpdateCategory';
import AddCategory from './addCategory/AddCategory';
import ModalConfirm from 'components/modal/ModalConfirm';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import Loading from 'components/loading/Loading';

export default function CategoryManagement() {
  const {
    stateComponent,
    selectedItem,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate,
    handleDeleteCateogory,
    handleToggleModalDelete,
    handleSearchTable,
    isLoadingCategory,
    dataCategory,
    handleSelectedIds,
    handlePaginationChange,
    searchParams,
    handleRemoveMultipleItems
  } = useCategoryManagement();

  return (
    <div>
      <>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
          <HeaderTable onAdd={handleToggleModalAdd} onRemove={handleRemoveMultipleItems} searchTable={handleSearchTable} />
        </Grid>
        {isLoadingCategory ? (
          <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
            <Loading />
          </Grid>
        ) : (
          <StyledDataGrid
            rows={dataCategory?.data?.rows || []}
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
        )}

        <Modal open={stateComponent.modal} onClose={handleToggleModalEdit}>
          <div>
            <UpdateCategory selectedBook={selectedItem} handleToggleModalBook={handleToggleModalEdit} handleSubmit={handleSubmitUpdate} />
          </div>
        </Modal>
        <Modal open={stateComponent.modalAdd} onClose={handleToggleModalAdd}>
          <div>
            <AddCategory handleToggleModal={handleToggleModalAdd} handleSubmit={handleSubmitAdd} />
          </div>
        </Modal>
        <ModalConfirm
          open={stateComponent.modalDelete}
          loading={false}
          onClose={handleToggleModalDelete}
          onConfirm={handleDeleteCateogory}
        />
      </>
    </div>
  );
}
