import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useCategoryManagement from './hook/useCategoryManagement';
import { Container, Grid, Modal } from '@mui/material';
import UpdateCategory from './updateCategory/UpdateCategory';
import AddCategory from './addCategory/AddCategory';
import ModalConfirm from 'components/modal/ModalConfirm';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import Loading from 'components/loading/Loading';

export default function CategoryManagement() {
  const {
    category,
    stateComponent,
    selectedItem,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate,
    handleDeleteCateogory,
    handleToggleModalDelete,
    handleSearchTable
  } = useCategoryManagement();

  return (
    <div>
      <>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
          <HeaderTable onAdd={handleToggleModalAdd} onRemove={handleToggleModalAdd} searchTable={handleSearchTable} />
        </Grid>
        <StyledDataGrid rows={category} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
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
          loading={stateComponent.loadingConfirm}
          onClose={handleToggleModalDelete}
          onConfirm={handleDeleteCateogory}
        />
      </>
    </div>
  );
}
