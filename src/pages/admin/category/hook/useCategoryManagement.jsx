import { useState, useEffect, useCallback } from 'react';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';
import { createCategory, deleteCategory, updateCategory } from '../services/category.api';
import { Box } from '@mui/system';
import ButtonAction from 'components/table/buttonAction/ButtonAction';
import { getAllCategoryQuery } from '../services/category.query';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';

const useCategoryManagement = () => {
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    modalAdd: false,
    modalDelete: false,
    total: 0,
    quantity: 0,
    selectIds: null
  });

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
    keyword: '',
    sort: 'desc'
  });
  const { data: dataCategory, isLoading: isLoadingCategory, refetch: refetchCategory } = getAllCategoryQuery({ params: searchParams });
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const handleSelectIds = useCallback((ids) => {
    setStateComponent((prev) => ({
      ...prev,
      selectIds: ids
    }));
  }, []);
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

  const handleEdit = (book) => {
    setSelectedItem(book);
    handleToggleModalEdit();
  };

  const handleDelete = (item) => {
    handleSelectIds([item.id]);
    handleToggleModalDelete();
  };

  const handleRemoveMultipleItems = useCallback(() => {
    if (stateComponent.selectIds?.length <= 0) {
      showToast('Bạn cần chọn ít nhất một mục để tiếp tục', 'warning');
      return;
    }
    handleToggleModalDelete();
  }, [selectedItem]);

  const handleSearchTable = useCallback((value) => {
    setSearchParams((prev) => ({
      ...prev,
      keyword: value
    }));
  }, []);

  const handleDeleteCateogory = useCallback(async () => {
    if (stateComponent.selectIds?.length <= 0) {
      showToast('Vui lòng chọn ít nhất 1 danh mục', 'error');
      return;
    }
    dispatch(showLoading());
    try {
      const body = { categoryID: stateComponent.selectIds };
      const response = await deleteCategory(body);
      if (response.err === 0) {
        showToast('Xóa thành công danh mục', 'success');
        await refetchCategory();
        handleToggleModalDelete();
      } else {
        showToast(response.mess, 'error');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      dispatch(hideLoading());
    }
  }, [stateComponent]);

  const handleSubmitAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append('type', values.type);
      if (values.images.length > 0) {
        formData.append('img', values.images[0]); // Lấy ảnh đầu tiên
      }
      dispatch(showLoading());

      const response = await createCategory(formData);
      if (response?.err !== 0) {
        showToast('Đã có lỗi xảy ra ' + response?.mess, 'warning');
        return;
      }
      await refetchCategory();
      showToast('Thêm thành công danh mục', 'success');
      dispatch(hideLoading());

      handleToggleModalAdd();
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    }
  };
  const handleSelectedIds = (selectedIds) => {
    setStateComponent((prev) => ({
      ...prev,
      selectIds: selectedIds
    }));
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
      await refetchCategory();
      showToast('Sửa danh mục thành công', 'success');
      handleToggleModalEdit();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    }
  };
  const handlePaginationChange = useCallback((model) => {
    setSearchParams((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
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
        return <img src={params.value} alt="Ảnh sản phẩm" width={80} height={80} />;
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

  useEffect(() => {
    if (dataCategory) {
      setStateComponent((prev) => ({
        ...prev,
        total: dataCategory?.totalPage,
        quantity: dataCategory?.data?.count
      }));
    }
  }, [dataCategory]);
  return {
    stateComponent,
    selectedItem,
    handleEdit,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate,
    handleDeleteCateogory,
    handleToggleModalDelete,
    handleSearchTable,
    isLoadingCategory,
    dataCategory,
    handlePaginationChange,
    handleSelectedIds,
    searchParams,
    handleRemoveMultipleItems
  };
};

export default useCategoryManagement;
