import React, { memo } from 'react';
import StyledDataGrid from 'components/table/StyledDataGrid';
import { Modal } from '@mui/base';
import { Grid } from '@mui/material';
import Loading from 'components/loading/Loading';
import usePostList from './hook/usePostList';
import UpdatePost from './updatePost/UpdatePost';

function ListPostManagement() {
  const { posts, selectedPost, handleEdit, stateComponent, handleListPost, handleToggleModalPost, columns } = usePostList();
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
      <Modal open={stateComponent.modal} onClose={handleToggleModalPost}>
        <div>
          <UpdatePost selectedPost={selectedPost} handleToggleModalPost={handleToggleModalPost} />
        </div>
      </Modal>
    </>
  );
}

export default memo(ListPostManagement);
