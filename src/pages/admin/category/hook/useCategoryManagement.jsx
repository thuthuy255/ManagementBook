import { useState, useEffect, useCallback } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from 'utils/format';
import { formatDate } from 'utils/format/FormatDate';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../services/category.api';
import { Box } from '@mui/system';

const useCategoryManagement = () => {
  const [category, setCategory] = useState([]);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false,
    modalAdd: false,
    modalDelete: false
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleModalConfirm = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);
  // Toggle modal
  const handleToggleModalEdit = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modal: !prev.modal
    }));
  }, []);

  const handleToggleModalAdd = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalAdd: !prev.modalAdd
    }));
  }, []);

  // Toggle loading
  const handleToggleLoading = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      loading: !prev.loading
    }));
  }, []);

  // Chọn sách để chỉnh sửa
  const handleEdit = (book) => {
    setSelectedItem(book);
    handleToggleModalEdit();
  };

  const handleDeleteCateogory = useCallback((book) => {
    deleteCategory()
      .then((response) => {
        if (response.err === 0) {
          handleListTable();
          showToast('Xóa thành công danh mục', 'success');
          handleToggleModalConfirm();
        } else {
          showToast(response.mess, 'error');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra: ' + error, 'error');
      })
      .finally(() => {});
  }, []);

  // Lấy danh sách sách từ API
  const handleListTable = () => {
    handleToggleLoading();
    getAllCategory()
      .then((response) => {
        if (response.err === 0) {
          setCategory(response?.data?.rows);
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
  };

  const handleSubmitAdd = async (values) => {
    try {
      console.log('Dữ liệu form:', values);
      const formData = new FormData();
      formData.append('type', values.type);
      if (values.images.length > 0) {
        formData.append('img', values.images[0]); // Lấy ảnh đầu tiên
      }
      const response = await createCategory(formData);
      if (response?.err !== 0) {
        showToast('Đã có lỗi xảy ra ' + response?.mess, 'warning');
        return;
      }
      showToast('Thêm thành công danh mục', 'success');
      handleListTable();
      handleToggleModalAdd();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    }
  };

  const handleSubmitUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append('type', values.type);
      formData.append('categoryID', values.id);
      if (values.images.length > 0) {
        formData.append('img', values.images[0]); // Lấy ảnh đầu tiên
      }

      const response = await updateCategory(formData);
      if (response?.err !== 0) {
        showToast('Đã có lỗi xảy ra ' + response?.mess, 'warning');
        return;
      }
      showToast('Sửa danh mục thành công', 'success');
      handleListTable();
      handleToggleModalEdit();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    }
  };
  useEffect(() => {
    handleListTable();
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    // { field: 'id', headerName: 'Mã danh mục', headerAlign: 'center', align: 'center', cellClassName: 'center-cell' },
    {
      field: 'type',
      headerName: 'Loại danh mục',
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
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleCloseModal(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return {
    category,
    stateComponent,
    selectedItem,
    handleEdit,
    handleListTable,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate
  };
};

export default useCategoryManagement;
