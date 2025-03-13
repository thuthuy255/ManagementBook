import { useState, useEffect, useCallback } from 'react';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../services/category.api';
import { Box } from '@mui/system';
import ButtonAction from 'components/table/buttonAction/ButtonAction';

const useCategoryManagement = () => {
  const [category, setCategory] = useState([]);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false,
    modalAdd: false,
    modalDelete: false,
    loadingConfirm: false
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleModalDelete = useCallback(() => {
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

  const handleToggleLoadingDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      loadingConfirm: !prev.loadingConfirm
    }));
  }, []);
  // Chọn sách để chỉnh sửa
  const handleEdit = (book) => {
    setSelectedItem(book);
    handleToggleModalEdit();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    handleToggleModalDelete();
  };

  const handleSearchTable = useCallback((value) => {
    handleListTable(value);
  }, []);

  const handleDeleteCateogory = useCallback(async () => {
    if (!selectedItem) {
      showToast('Không lấy được id', 'error');
      return;
    }

    handleToggleLoadingDelete();

    try {
      const body = { categoryID: `${selectedItem?.id}` };
      const response = await deleteCategory(body);

      console.log('Xin chào body', response);

      if (response.err === 0) {
        await handleListTable();
        showToast('Xóa thành công danh mục', 'success');
        handleToggleModalDelete();
      } else {
        showToast(response.mess, 'error');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      handleToggleLoadingDelete();
    }
  }, [selectedItem, handleToggleLoadingDelete]);

  // Lấy danh sách sách từ API
  const handleListTable = useCallback(async (type) => {
    handleToggleLoading();
    try {
      const response = await getAllCategory({
        ...(type && { type }),
        page: 1,
        limit: 5
      });

      if (response.err === 0) {
        setCategory(response?.data?.rows);
      } else {
        showToast(response.mess, 'error');
      }
    } catch (error) {
      console.error('Lỗi lấy danh mục:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      handleToggleLoading();
    }
  }, []);

  const handleSubmitAdd = async (values) => {
    try {
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
      handleListTable();
      showToast('Thêm thành công danh mục', 'success');

      handleToggleModalAdd();
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
    handleSearchTable();
  }, []);
  const columns = [
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
      height: '200px',
      renderCell: (params) => {
        return <img src={params.value} alt="Ảnh sản phẩm" width={70} height={70} />;
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
      renderCell: (params) => <ButtonAction item={params?.row} onEdit={handleEdit} onDelete={handleDelete} />
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
    handleSubmitUpdate,
    handleDeleteCateogory,
    handleToggleModalDelete,
    handleSearchTable
  };
};

export default useCategoryManagement;
