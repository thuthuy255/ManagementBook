import { useState, useEffect, useCallback } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import { showToast } from 'components/notification/CustomToast';
import { formatDate } from 'utils/format/FormatDate';

import { Box } from '@mui/system';
import { getAllBanner } from '../services/banner.api';

const useBannerManagement = () => {
  const [banner, setBanner] = useState([]);
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
  const handleEdit = (banner) => {
    setSelectedItem(banner);
    handleToggleModalEdit();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    handleToggleModalDelete();
  };

  const handleSearchTable = useCallback((value) => {
    handleListTable(value);
  }, []);

  const handleDeleteBanner = useCallback(() => {
    console.log('Xóa phần tử này:', selectedItem?.id);
    if (!selectedItem) {
      showToast('Không lấy được id  ', 'error');
      return;
    }
    handleToggleLoadingDelete();
    const body = {
      BannerID: selectedItem?.id
    };
    deleteBanner(body)
      .then((response) => {
        if (response.err === 0) {
          handleListTable();
          showToast('Xóa thành công banner', 'success');
          handleToggleModalDelete();
        } else {
          showToast(response.mess, 'error');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng ký:', error);
        showToast('Có lỗi xảy ra: ' + error, 'error');
      })
      .finally(() => {
        handleToggleLoadingDelete();
      });
  }, [selectedItem]);

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

  const handleSubmitAdd = async (values) => {
    try {
      console.log('Dữ liệu form:', values);
      const formData = new FormData();
      if (values.images.length > 0) {
        formData.append('img', values.images[0]); // Lấy ảnh đầu tiên
      }
      const response = await createBanner(formData);
      if (response?.err !== 0) {
        showToast('Đã có lỗi xảy ra ' + response?.mess, 'warning');
        return;
      }
      showToast('Thêm thành công banner', 'success');
      handleListTable();
      handleToggleModalAdd();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo banner:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    }
  };

  const handleSubmitUpdate = async (values) => {
    try {
      const formData = new FormData();
      formData.append('BannerID', values.id);
      if (values.images.length > 0) {
        formData.append('img', values.images[0]); // Lấy ảnh đầu tiên
      }

      const response = await updateBanner(formData);
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
  // Cấu hình cột cho bảng


  return {
    banner,
    stateComponent,
    selectedItem,
    handleEdit,
    handleListTable,
    handleToggleModalEdit,
    columns,
    handleToggleModalAdd,
    handleSubmitAdd,
    handleSubmitUpdate,
    handleDeleteBanner,
    handleToggleModalDelete,
    handleSearchTable
  };
};

export default useBannerManagement;
