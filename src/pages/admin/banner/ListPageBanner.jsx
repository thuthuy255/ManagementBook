import { Box, Grid, Modal } from '@mui/material';
import Loading from 'components/loading/Loading';
import StyledDataGrid from 'components/table/StyledDataGrid';
import React, { memo } from 'react'
import useListBanner from './hook/useListBanner';
import UpdateBanner from './updateBanner/UpdateBanner';
import ModalConfirm from 'components/modal/ModalConfirm';

function ListPageBanner() {
    const {
        banner,
        stateComponent,
        selectedItem,
        handleToggleModalEdit,
        columns,
        handleDeleteBanner,
        handleToggleModalDelete,
    } = useListBanner();
    if (stateComponent.loading) {
        return (
            <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
                <Loading />
            </Grid>
        );
    }
    return (
        <div>
            <StyledDataGrid rows={banner} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
            <ModalConfirm open={stateComponent.modalDelete} onClose={handleToggleModalDelete} onConfirm={handleDeleteBanner} loading={false} />
            {/* <Modal open={stateComponent.modal} onClose={handleToggleModalEdit}>
                <div>
                    <UpdateBanner selectedItem={selectedItem} handleToggleModalEdit={handleToggleModalEdit} />
                </div>
            </Modal> */}
        </div>
    );
}
export default memo(ListPageBanner);