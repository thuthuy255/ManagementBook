import { useState, useEffect, useCallback } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { deleteBook, ListBook } from '../services/book.api';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from 'utils/format';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { useNavigate } from 'react-router';

const useBookList = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [stateComponent, setStateComponent] = useState({
    loading: false,
    modalDelete: false
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [listIdProducts, setListIdProducts] = useState([]);
  const handleSearchTable = useCallback((value) => {
    console.log('Đây là value', value);
  }, []);
  const handleNavigateAdd = useCallback(() => {
    navigate('/add-book');
  }, [navigate]);

  const handleRemoveMultipleItems = useCallback(async () => {
    if (!listIdProducts || listIdProducts?.length <= 0) {
      showToast('Vui lòng chọn sản phẩm', 'warning');
      return;
    }
    try {
      dispacth(showLoading());
      const body = {
        productIDs: [listIdProducts]
      };
      const response = await deleteBook(body);
      if (response?.err !== 0) {
        showToast(response?.mess, 'warning');
        return;
      }
      await handleListBook();
      showToast('Xóa thành công', 'success');
    } catch (error) {
      console.error('Có lỗi xảy ra', error);
      showToast(error, 'error');
    } finally {
      dispacth(hideLoading());
    }
  }, [listIdProducts]);
  //Đóng modal delete
  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);

  const handleDeleteConfirm = useCallback((id) => {
    if (!id) return;
    handleToggleModalDelete();
    setSelectedBook(id);
  }, []);

  // Toggle loading
  const handleToggleLoading = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      loading: !prev.loading
    }));
  }, []);

  const handleNavigateUpdate = (slug) => {
    if (!slug) {
      showToast('Không lấy được slug', 'error');
      return;
    }
    navigate(`/update-book/${slug}`);
  };
  // Lấy danh sách sách từ API
  const handleListBook = () => {
    handleToggleLoading();
    ListBook()
      .then((response) => {
        if (response.err === 0) {
          setBooks(response?.data?.rows);
        } else {
          showToast(response.message, 'error');
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

  const handleDeleteProducts = useCallback(async () => {
    dispacth(showLoading());

    if (!selectedBook) {
      dispacth(hideLoading());
      showToast('Không tìm thấy sản phẩm', 'error');
      return;
    }
    try {
      const body = {
        productIDs: [selectedBook]
      };
      const response = await deleteBook(body);
      if (response?.err !== 0) {
        showToast(response?.mess, 'warning');
        dispacth(hideLoading());
        return;
      }
      await handleListBook();
      showToast('Xóa thành công', 'success');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      showToast('Có lỗi xảy ra: ' + error, 'error');
    } finally {
      dispacth(hideLoading());
      handleToggleModalDelete();
    }
  }, [selectedBook]);

  const handleSelectedIds = (selectedIds) => {
    setListIdProducts(selectedIds);
  };

  useEffect(() => {
    handleListBook();
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    // { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center' },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      headerAlign: 'center',
      width: '100px',
      align: 'center'
    },
    {
      field: 'price',
      headerName: 'Giá',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      renderCell: (params) => <div>{formatPrice(params.value)}</div>
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 2,

      headerAlign: 'center',
      align: 'center',
      cellClassName: 'wrap-text'
    },
    {
      field: 'author',
      headerName: 'Tác giả',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'publisher',
      headerName: 'Nhà xuất bản',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'qty',
      headerName: 'Số lượng',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'img_src',
      headerName: 'Ảnh',
      sortable: false,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      height: '300px',
      renderCell: (params) => {
        const firstImage = JSON.parse(params.value)?.[0];
        return firstImage ? <img src={firstImage} alt="Ảnh sản phẩm" width={100} height={100} /> : null;
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
          <IconButton color="primary" size="small" onClick={() => handleNavigateUpdate(params.row.slug)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={handleDeleteConfirm.bind(null, params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  return {
    books,
    stateComponent,
    selectedBook,
    handleListBook,
    columns,
    handleToggleModalDelete,
    handleDeleteProducts,
    handleSelectedIds,
    handleNavigateAdd,
    handleRemoveMultipleItems,
    handleSearchTable
  };
};

export default useBookList;
