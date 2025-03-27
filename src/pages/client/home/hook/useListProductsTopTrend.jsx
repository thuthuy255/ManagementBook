import { getCategories } from 'features/slices/category.slice';
import { useLottie } from 'lottie-react';
import { getAllBookQuery } from 'pages/admin/book/services/book.query';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import animation_rong from '../../../../assets/json/animation_rong.json';
export default function useListProductsTopTrend() {
  const options = {
    animationData: animation_rong,
    loop: true
  };
  const { View } = useLottie(options);

  const getListCategary = useSelector(getCategories);
  const [value, setValue] = useState();
  const [searchProducts, setSearchProducts] = useState({
    keyword: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price',
    sort: 'desc',
    page: 1,
    limit: 10
  });
  const { data: books, isLoading: isLoadingBook, error } = getAllBookQuery({ params: searchProducts });
  const getImage = (product) => {
    if (product.img_src) {
      const images = JSON.parse(product.img_src);
      return images?.length ? images[0] : '';
    }
    return '';
  };

  useEffect(() => {
    if (Array.isArray(getListCategary) && getListCategary.length > 0) {
      const firstItem = getListCategary[0];

      if (firstItem?.id) {
        setValue(firstItem.id);
        setSearchProducts((prev) => ({
          ...prev,
          type: firstItem.type
        }));
      }
    }
  }, [getListCategary]);

  const handleChange = useCallback(
    (event, newValue) => {
      if (!newValue) {
        showToast('Không lấy được value tab', 'error');
      }
      const getTypeCategary = getListCategary?.slice(0, 3)?.find((item) => item?.id == newValue);
      if (getTypeCategary) {
        setSearchProducts((prev) => ({
          ...prev,
          type: getTypeCategary?.type
        }));
      }

      setValue(newValue);
    },
    [getListCategary]
  );
  return { value, getListCategary, isLoadingBook, books, View, handleChange, getImage };
}
