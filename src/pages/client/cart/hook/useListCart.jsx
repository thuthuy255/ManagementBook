import { useEffect, useState } from 'react';
import { getListCartQuery } from '../services/cart.query';
import { addCategory } from 'services/clients/product';
import { showToast } from 'components/notification/CustomToast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from 'features/slices/loading.slice';
const useListCart = () => {
  const { data: listCart, isLoading, refetch } = getListCartQuery();
  const [dataCart, setDataCart] = useState();
  useEffect(() => {
    if (listCart) {
      setDataCart(listCart?.data);
    }
  }, [listCart]);
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

  const handleSetCountMinus = (idProduct) => {
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
  return { count, handleSetCountPlus, handleSetCountMinus, listCart, isLoading };
};
export default useListCart;
