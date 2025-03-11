import { Grid, Modal } from '@mui/material';
import Loading from 'components/loading/Loading';
import StyledDataGrid from 'components/table/StyledDataGrid';
import React, { memo } from 'react'
import useListBanner from './hook/useListBanner';
import UpdateBanner from './updateBanner/UpdateBanner';

function ListPageBanner() {
    const { banner, selectedBanner, handleEdit, stateComponent, handleToggleModalBanner, columns, handleSearchTable } = useListBanner();
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
            <Modal open={stateComponent.modal} onClose={handleToggleModalBanner}>
                <div style={{ backgroundColor: 'white', width: '100%' }}>
                    <UpdateBanner selectedBanner={selectedBanner} handleToggleModalBanner={handleToggleModalBanner} />
                </div>
            </Modal>
        </div>
    );
}
export default memo(ListPageBanner);