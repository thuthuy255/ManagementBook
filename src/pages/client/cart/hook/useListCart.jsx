import { useCallback, useEffect, useState } from 'react';
import { getListCartQuery } from '../services/cart.query';
import { addCategory, updateCart } from 'services/clients/product';
import { showToast } from 'components/notification/CustomToast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
import { clearListCart } from '../services/cart.api';
const useListCart = () => {
  const { data: listCart, isLoading, refetch } = getListCartQuery();
  const [statusModal, setStatusModal] = useState(false);
  const handleToggleModal = useCallback(() => {
    setStatusModal((prev) => !prev);
  }, []);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const handleSetCountPlus = (idProduct) => {
    const body = {
      productID: idProduct,
      qty: 1
    };
    dispatch(showLoading());
    addCategory(body)
      .then((res) => {
        if (res?.err == 0) {
          refetch();
        }
        showToast(res?.mess, res?.err == 0 ? 'success' : 'error');
      })
      .catch((e) => {
        console.error('Có lỗi xảy ra', e);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };

  const handleDeleteCart = useCallback(() => {
    dispatch(showLoading());
    clearListCart()
      .then((res) => {
        if (res?.err == 0) {
          refetch();
          showToast('Xóa thành công giỏ hàng', 'success');
        } else {
          showToast(res?.mess, 'error');
        }
      })
      .catch((e) => {
        showToast(e, 'error');
        console.err('Có lỗi xảy ra', e);
      })
      .finally(() => {
        dispatch(hideLoading());
        handleToggleModal();
      });
  }, []);

  const handleSetCountMinus = (idProduct, qty) => {
    const body = {
      productID: idProduct,
      qty: qty
    };
    dispatch(showLoading());
    updateCart(body)
      .then((res) => {
        if (res?.err == 0) {
          refetch();
        }
        showToast(res?.mess, res?.err == 0 ? 'success' : 'error');
      })
      .catch((e) => {
        console.error('Có lỗi xảy ra', e);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
  return { count, handleSetCountPlus, handleSetCountMinus, listCart, isLoading, handleToggleModal, statusModal, handleDeleteCart };
};
export default useListCart;
