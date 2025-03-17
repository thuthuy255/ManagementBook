import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import { Grid } from '@mui/material';
import Loading from 'components/loading/Loading';
import usePostList from './hook/usePostList';
import ModalConfirm from 'components/modal/ModalConfirm';

function ListPostManagement() {
  const { posts, stateComponent, columns, handleDelete, handleToggleModalDelete } = usePostList();
  if (stateComponent.loading) {
    return (
      <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
        <Loading />
      </Grid>
    );
  }
  return (
    <>
      <StyledDataGrid rows={posts} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
      <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDelete} loading={false} />
      {/* <Modal open={stateComponent.modal} onClose={handleToggleModalPost}>
        <div>
          <UpdatePost selectedPost={selectedPost} handleToggleModalPost={handleToggleModalPost} />
        </div>
      </Modal> */}
    </>
  );
}

export default memo(ListPostManagement);
