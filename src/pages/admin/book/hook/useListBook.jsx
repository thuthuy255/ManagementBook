import { useState, useEffect, useCallback } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ListBook } from '../services/book.api';
import { showToast } from 'components/notification/CustomToast';
import { formatPrice } from 'utils/format';

const useBookList = () => {
  const [books, setBooks] = useState([]);
  const [stateComponent, setStateComponent] = useState({
    modal: false,
    loading: false
  });
  const [selectedBook, setSelectedBook] = useState(null);

  // Toggle modal
  const handleToggleModalBook = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modal: !prev.modal
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
    setSelectedBook(book);
    handleToggleModalBook();
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
    books,
    stateComponent,
    selectedBook,
    handleEdit,
    handleListBook,
    handleToggleModalBook,
    columns
  };
};

export default useBookList;
