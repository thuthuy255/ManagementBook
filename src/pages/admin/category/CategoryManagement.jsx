import StyledDataGrid from 'components/table/StyledDataGrid';
import React from 'react';
import useCategoryManagement from './hook/useCategoryManagement';
import { Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateCategory from './updateCategory/UpdateCategory';
import AddCategory from './addCategory/AddCategory';
export default function CategoryManagement() {
  const {
    category,
    selectedItem,
    handleEdit,
    stateComponent,
    handleListTable,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate
  } = useCategoryManagement();
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: 1 }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quản lý danh mục</span>
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
    </div>
  );
}
