// import React, { memo } from 'react'

// function ListPageOrder() {
//     const { order, selectedOrder, handleEdit, stateComponent, handleToggleModalOrder, columns, handleSearchTable } = useOrderList();
//     if (stateComponent.loading) {
//         return (
//             <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
//                 <Loading />
//             </Grid>
//         );
//     }
//     return (
//         <div>
//             <StyledDataGrid rows={order} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
//             <Modal open={stateComponent.modal} onClose={handleToggleModalOrder}>
//                 <div style={{ backgroundColor: 'white', width: '100%' }}>
//                     <UpdateOrder selectedOrder={selectedOrder} handleToggleModalOrder={handleToggleModalBanner} />
//                 </div>
//             </Modal>
//         </div>
//     );
// }

// export default memo(ListPageOrder)