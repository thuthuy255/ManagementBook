import { Grid, Modal } from '@mui/material';
import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import UpdateBook from './updateBook/UpdateBook';
import useBookList from './hook/useListBook';
import Loading from 'components/loading/Loading';
import HeaderTable from 'components/table/headerTable/HeaderTable';
import ModalConfirm from 'components/modal/ModalConfirm';

function ListPageBook() {
  const {
    books,
    selectedBook,
    handleEdit,
    stateComponent,
    handleToggleModalBook,
    columns,
    handleSearchTable,
    handleToggleModalDelete,
    handleDeleteProducts,
    handleSubmitUpdate
  } = useBookList();
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
      <Modal open={stateComponent.modal} onClose={handleToggleModalBook}>
        <div>
          <UpdateBook selectedBook={selectedBook} handleToggleModalBook={handleToggleModalBook} handleSubmit={handleSubmitUpdate} />
        </div>
      </Modal>
    </div>
  );
}

export default memo(ListPageBook);
