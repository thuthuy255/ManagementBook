// import React from 'react'

// const useListCart = () => {
//     const [cart, setCart] = useState([]);
//     const [stateComponent, setStateComponent] = useState({
//         modal: false,
//         loading: false,
//         modalAdd: false,
//         modalDelete: false,
//         loadingConfirm: false
//     });
//     const [selectedCart, setSelectedCart] = useState(null);

//     // Toggle modal
//     const handleToggleModalCart = useCallback(() => {
//         setStateComponent((prev) => ({
//             ...prev,
//             modal: !prev.modal
//         }));
//     }, []);

//     // Toggle loading
//     const handleToggleLoading = useCallback(() => {
//         setStateComponent((prev) => ({
//             ...prev,
//             loading: !prev.loading
//         }));
//     }, []);

//     // Chọn sách để chỉnh sửa
//     const handleEdit = (cart) => {
//         setSelectedCart(cart);
//         handleToggleModalCart();
//     };

//     // Lấy danh sách sách từ API
//     const handleListCart = () => {
//         handleToggleLoading();
//         getAllCart()
//             .then((response) => {
//                 if (response.err === 0) {
//                     setCart(response?.data?.rows);
//                 } else {
//                     showToast(response.message, 'error');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Lỗi đăng ký:', error);
//                 showToast('Có lỗi xảy ra: ' + error, 'error');
//             })
//             .finally(() => {
//                 handleToggleLoading();
//             });
//     };

//     useEffect(() => {
//         handleListCart();
//     }, []);

//     // Cấu hình cột cho bảng
//     const columns = [
//         // { field: 'id', headerName: 'Mã danh mục', headerAlign: 'center', align: 'center', cellClassName: 'center-cell' },
//         {
//             field: 'name',
//             headerName: 'Tên Cart',
//             flex: 1,
//             headerAlign: 'center',
//             width: '100px',
//             align: 'center',
//             cellClassName: 'center-cell'
//         },
//         {
//             field: 'img',
//             headerName: 'Ảnh',
//             sortable: false,
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center',
//             height: '300px',
//             renderCell: (params) => {
//                 return <img src={params.value} alt="Ảnh sản phẩm" width={100} height={100} />;
//             }
//         },
//         {
//             field: 'active',
//             headerName: 'Hiển thị',
//             sortable: false,
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center',

//             renderCell: (params) => {
//                 return <span>{params?.value == '1' ? 'Hiển thị' : 'Không hiển thị'}</span>;
//             }
//         },
//         {
//             field: 'createdAt',
//             headerName: 'Ngày tạo',
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center',
//             renderCell: (params) => {
//                 return (
//                     <Box container justifyContent={'center'} alignItems={'center'}>
//                         <p>{formatDate(params.value)}</p>
//                     </Box>
//                 );
//             }
//         },
//         {
//             field: 'actions',
//             headerName: 'Hành động',
//             sortable: false,
//             flex: 1,
//             headerAlign: 'center',
//             align: 'center',
//             renderCell: (params) => (
//                 <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '5px' }}>
//                     <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton color="error" size="small" onClick={() => handleCloseModal(params.row.id)}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </div>
//             )
//         }
//     ];

//     return {
//         cart,
//         stateComponent,
//         selectedCart,
//         handleEdit,
//         handleListCart,
//         handleToggleModalCart,
//         columns
//     };
// };

// export default useListCart