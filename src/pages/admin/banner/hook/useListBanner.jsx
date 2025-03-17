import { useState, useEffect, useCallback } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from 'utils/format';
import { getAllBanner } from '../services/banner.api';
import { formatDate } from 'utils/format/FormatDate';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useNavigate, useParams } from 'react-router';
const useListBanner = () => {
    const dispacth = useDispatch();
    const [banner, setBanner] = useState([]);
    const [stateComponent, setStateComponent] = useState({
        modal: false,
        loading: false,
        modalAdd: false,
        modalDelete: false,
        loadingConfirm: false
    });

    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const handleNavigate = (name) => {
        navigate(`/update-banner/${name}`);
    }
    //Đóng/mở modal delete
    const handleToggleModalDelete = useCallback(() => {
        setStateComponent((prev) => ({
            ...prev,
            modalDelete: !prev.modalDelete
        }));
    }, []);
    //Xác nhận xóa 
    const handleDeleteConfirm = useCallback((id) => {
        if (!id) return;
        handleToggleModalDelete();
        setSelectedItem(id);
    }, []);
    //Đóng/mở modal edit
    const handleToggleModalEdit = useCallback(() => {
        setStateComponent((prev) => ({
            ...prev,
            modal: !prev.modal
        }));
    }, []);
    // Chọn banner để chỉnh sửa
    const handleEdit = (banner) => {
        setSelectedItem(banner);
        handleToggleModalEdit();
    };

    // Đóng mở loading
    const handleToggleLoading = useCallback(() => {
        setStateComponent((prev) => ({
            ...prev,
            loading: !prev.loading
        }));
    }, []);

    // Lấy danh sách sách từ API
    const handleListTable = useCallback((type) => {
        handleToggleLoading();
        getAllBanner({
            ...(type && { type }),
            page: 1,
            limit: 5
        })
            .then((response) => {
                if (response.err === 0) {
                    setBanner(response?.data?.rows);
                } else {
                    showToast(response.mess, 'error');
                }
            })
            .catch((error) => {
                console.error('Lỗi đăng ký:', error);
                showToast('Có lỗi xảy ra: ' + error, 'error');
            })
            .finally(() => {
                handleToggleLoading();
            });
    }, []);
    // Hàm xóa banner
    const handleDeleteBanner = useCallback(async () => {
        dispacth(showLoading());
        if (!selectedItem) {
            dispacth(hideLoading());
            showToast('Không tìm thấy banner', 'error');
            return;
        };
        try {
            const formData = new FormData();
            formData.append('BannerID', id);
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            const response = await deleteBanner(formData);
            if (response?.err !== 0) {
                showToast(response?.mess, 'warning');
                dispacth(hideLoading());
                return
            }
            await handleListTable();
            showToast('Xóa banner thành công', 'success');
        } catch (error) {
            console.error('Lỗi khi xóa banner:', error);
            showToast('Có lỗi xảy ra: ' + error, 'error');
        }
        finally {
            dispacth(hideLoading());
            handleToggleModalDelete();
        }
    }, [selectedItem]);
    useEffect(() => {
        handleListTable();
    }, []);

    // Cấu hình cột cho bảng
    const columns = [
        // { field: 'id', headerName: 'Mã danh mục', headerAlign: 'center', align: 'center', cellClassName: 'center-cell' },
        {
            field: 'name',
            headerName: 'Tên Banner',
            flex: 1,
            headerAlign: 'center',
            width: '100px',
            align: 'center',
            cellClassName: 'center-cell'
        },
        {
            field: 'img',
            headerName: 'Ảnh',
            sortable: false,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            height: '300px',
            renderCell: (params) => {
                return <img src={params.value} alt="Ảnh sản phẩm" width={100} height={100} />;
            }
        },
        {
            field: 'active',
            headerName: 'Hiển thị',
            sortable: false,
            flex: 1,
            headerAlign: 'center',
            align: 'center',

            renderCell: (params) => {
                return <span>{params?.value == '1' ? 'Hiển thị' : 'Không hiển thị'}</span>;
            }
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <Box container justifyContent={'center'} alignItems={'center'}>
                        <p>{formatDate(params.value)}</p>
                    </Box>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            sortable: false,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '5px' }}>
                    <IconButton color="primary" size="small" onClick={() => handleNavigate(params.row.name)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    ];

    return {
        banner,
        stateComponent,
        selectedItem,
        handleEdit,
        handleListTable,
        handleToggleModalEdit,
        columns,
        handleDeleteBanner,
        handleToggleModalDelete,
        handleDeleteConfirm
    };
};

export default useListBanner