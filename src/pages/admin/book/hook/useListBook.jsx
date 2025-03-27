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
import { getAllBookQuery } from '../services/book.query';
import { formatJson } from 'utils/format/FormatJson';

const useBookList = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [stateComponent, setStateComponent] = useState({
    loading: false,
    modalDelete: false,
    total: 0,
    quantity: 0,
    modalWarring: false
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [listIdProducts, setListIdProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState({
    keyword: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price',
    sort: 'desc',
    page: 1,
    limit: 5
  });
  const { data: books, isLoading: isFetchingBook, error, refetch: refetchBook } = getAllBookQuery({ params: searchProducts });
  const handleSearchTable = useCallback((value) => {
    setSearchProducts((prev) => {
      if (prev.keyword === value) return prev; // Tránh cập nhật không cần thiết
      return {
        ...prev,
        keyword: value
      };
    });
  }, []);

  const handleDeleteConfirm = useCallback((item) => {
    if (!item) return;
    handleToggleModalDelete();
    setSelectedBook([item.id]);
  }, []);

  const handleToggleModalWarring = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalWarring: !prev.modalWarring
    }));
  }, []);

  const handleNavigateAdd = useCallback(() => {
    navigate('/add-book');
  }, [navigate]);
  //Đóng modal delete
  const handleToggleModalDelete = useCallback(() => {
    setStateComponent((prev) => ({
      ...prev,
      modalDelete: !prev.modalDelete
    }));
  }, []);
  const handleDeleteProducts = async () => {
    dispacth(showLoading());
    if (!selectedBook) {
      dispacth(hideLoading());
      showToast('Không tìm thấy sản phẩm', 'error');
      return;
    }
    try {
      const body = {
        productIDs: selectedBook
      };
      const response = await deleteBook(body);
      if (response?.err !== 0) {
        await refetchBook();
        handleToggleModalDelete();
        showToast('Xóa sách thành công', 'success');
      } else {
        showToast(response?.mess, 'warning');
      }
    } catch (error) {
      console.error('Lỗi xóa sách:', error);
      showToast('Có lỗi xảy ra: ', 'error');
    } finally {
      dispacth(hideLoading());
    }
  };
  const handleRemoveMultipleItems = useCallback(() => {
    console.log(selectedBook);
    if (selectedBook?.length <= 0) {
      showToast('Bạn cần chọn ít nhất một mục để tiếp tục', 'warning');
      return;
    }
    handleToggleModalDelete();
  }, [navigate, selectedBook]);

  const handleNavigateUpdate = (slug) => {
    if (!slug) {
      showToast('Không lấy được slug', 'error');
      return;
    }
    navigate(`/update-book/${slug}`);
  };

  const handleSelectedIds = (selectedIds) => {
    setSelectedBook(selectedIds);
  };

  const handlePaginationChange = useCallback((model) => {
    setSearchProducts((prev) => ({
      ...prev,
      page: model.page + 1,
      limit: model.pageSize
    }));
  }, []);

  const columns = [
    // { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center' },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      headerAlign: 'center',
      width: '100px',
      align: 'center'
      // renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
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
      cellClassName: 'wrap-text',
      renderCell: (params) => (
        <div
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            maxHeight: '4.5em' /* Tùy chỉnh theo font-size */
          }}
        >
          {params.value}
        </div>
      )
    },

    {
      field: 'author',
      headerName: 'Tác giả',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
      // renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
    },
    {
      field: 'publisher',
      headerName: 'Nhà xuất bản',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
      // renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
    },
    {
      field: 'qty',
      headerName: 'Số lượng',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
      // renderCell: (params) => <span>{params.value?.toUpperCase() || 'Không có'}</span>
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
        const listImage = formatJson(params?.value);
        if (!listImage) {
          return <span>Không có</span>;
        }
        return <img src={listImage[0]} alt="Ảnh đại diện" width={80} height={80} />;
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
        <>
          <IconButton color="primary" size="small" onClick={() => handleNavigateUpdate(params.row.slug)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDeleteConfirm(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  useEffect(() => {
    if (books) {
      setStateComponent((prev) => ({
        ...prev,
        total: books?.totalPage,
        quantity: books?.data?.count
      }));
    }
  }, [books]);

  return {
    books,
    stateComponent,
    selectedBook,
    columns,
    isFetchingBook,
    handleToggleModalDelete,
    handleDeleteProducts,
    handleSelectedIds,
    handleNavigateAdd,
    handleRemoveMultipleItems,
    handleSearchTable,
    searchProducts,
    handlePaginationChange
  };
};

export default useBookList;
