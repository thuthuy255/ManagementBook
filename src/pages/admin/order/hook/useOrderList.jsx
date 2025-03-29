import { useCallback, useEffect, useState } from 'react';
import { getAllListOrder } from '../services/order.query';
import { getImage } from 'utils/getImage';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { formatPrice } from 'utils/format';
import { formatDate } from 'utils/format/FormatDate';
import useMenu from 'hook/useMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { updateOrderCompleted } from '../services/order.api';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { showToast } from 'components/notification/CustomToast';
const useOrderList = () => {
  const [searchOrder, setSearchOrder] = useState({
    keyword: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price',
    sort: 'desc',
    page: 1,
    limit: 5
  });
  const [stateComponent, setStateComponent] = useState({
    modalConfirm: false,
    total: 0,
    quantity: 0,
    modalCancel: false
  });
  const [selectItem, setSelectItem] = useState();
  const dispatch = useDispatch();
  const { data: listOrder, isLoading: isFetchingOrder, error, refetch } = getAllListOrder({ params: searchOrder });

  const updateStateComponent = (key, value) => {
    setStateComponent((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleOpenModalConfirm = (name, status, item) => {
    updateStateComponent(name, status);
    setSelectItem(item);
  };

  const handleConfirmOrder = useCallback(() => {
    const body = {
      updatedAt: selectItem?.updatedAt
    };
    dispatch(showLoading());
    updateOrderCompleted(body)
      .then((res) => {
        if (res?.err === 0) {
          showToast('Đã xác nhận đơn hàng', 'success');

          refetch();
        } else {
          showToast(res?.mess, 'error');
        }
      })
      .catch((e) => {
        console.error('Có lỗi xảy ra:', e);
        showToast(e, 'error');
      })
      .finally(() => {
        dispatch(hideLoading());
        updateStateComponent('modalConfirm', false);
      });
  }, [selectItem]);

  const handleCancelOrder = useCallback(() => {
    const body = {
      updatedAt: selectItem?.updatedAt
    };
    dispatch(showLoading());
    updateOrderCompleted(body)
      .then((res) => {
        if (res?.err === 0) {
          showToast('Đã xác nhận đơn hàng', 'success');
          refetch();
        } else {
          showToast(res?.mess, 'error');
        }
      })
      .catch((e) => {
        console.error('Có lỗi xảy ra:', e);
        showToast(e, 'error');
      })
      .finally(() => {
        dispatch(hideLoading());
        updateStateComponent('modalCancel', false);
      });
  }, []);

  const { anchorEl, open, handleOpen, handleClose } = useMenu();
  const handleSearchTable = useCallback((value) => {
    setSearchOrder((prev) => {
      if (prev.keyword === value) return prev; // Tránh cập nhật không cần thiết
      return {
        ...prev,
        keyword: value
      };
    });
  }, []);

  useEffect(() => {
    if (listOrder) {
      setStateComponent((prev) => ({
        ...prev,
        total: listOrder?.totalPage,
        quantity: listOrder?.totalItems
      }));
    }
  }, [listOrder]);
  const columns = [
    // {
    //   field: 'id',
    //   headerName: 'Mã đơn hàng',
    //   flex: 1,
    //   headerAlign: 'center',
    //   align: 'center'
    // },
    {
      field: 'total',
      headerName: 'Tổng tiền',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <div>{formatPrice(params.value)}</div>
    },
    {
      field: 'qty',
      headerName: 'Tổng số lượng sản phẩm',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'products',
      headerName: 'Danh sách sản phẩm',
      flex: 3,
      headerAlign: 'center',
      align: 'left',
      renderCell: (params) => {
        const products = params.value || [];
        return (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {products.map((product, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={getImage(product)} // Lấy ảnh đầu tiên trong danh sách
                  alt={product.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: '5px' }}
                />
                <div>
                  <strong>{product.name}</strong>
                  <p>Giá: {formatPrice(product.price)}</p>
                  <p>Số lượng: {product.qty}</p>
                </div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Cập nhật lúc',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => formatDate(params.value)
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
          <Tooltip title="Trạng thái" placement="top">
            <IconButton sx={{ color: BACKGROUND_DEFAULT }} size="small" onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleOpenModalConfirm('modalConfirm', 'true', params.row)}>Xác nhận đơn hàng</MenuItem>
          </Menu>
        </>
      )
    }
  ];
  return {
    listOrder,
    isFetchingOrder,
    error,
    refetch,
    columns,
    searchOrder,
    stateComponent,
    handleSearchTable,
    updateStateComponent,
    handleConfirmOrder,
    handleCancelOrder
  };
};
export default useOrderList;
