// import { Grid, Modal } from '@mui/material';
// import Loading from 'components/loading/Loading';
// import StyledDataGrid from 'components/table/StyledDataGrid';
// import React from 'react'

// function ListPageCart() {
//     // const { cart, selectedCart, handleEdit, stateComponent, handleToggleModalCart, columns, handleSearchTable } = useListBanner();
//     if (stateComponent.loading) {
//         return (
//             <Grid container minHeight="50vh" justifyContent="center" alignItems="center">
//                 <Loading />
//             </Grid>
//         );
//     }
//     return (
//         <div>
//             <StyledDataGrid rows={cart} columns={columns} paginationModel={{ page: 0, pageSize: 5 }} />
//             {/* <Modal open={stateComponent.modal} onClose={handleToggleModalCart}>
//                 <div style={{ backgroundColor: 'white', width: '100%' }}>
//                     <UpdateBanner selectedCart={selectedCart} handleToggleModalCart={handleToggleModalCart} />
//                 </div>
//             </Modal> */}
//         </div>
//     );
// }

// export default ListPageCart