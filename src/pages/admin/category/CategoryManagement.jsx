import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useCategoryManagement from './hook/useCategoryManagement';
import { Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateCategory from './updateCategory/UpdateCategory';
import AddCategory from './addCategory/AddCategory';
import ModalConfirm from 'components/modal/ModalConfirm';
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
    handleToggleModalDelete
  } = useCategoryManagement();
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          onClick={handleToggleModalAdd}
        >
          <AddIcon />
          <span>Thêm mới</span>
        </Button>
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
    </div>
  );
}
