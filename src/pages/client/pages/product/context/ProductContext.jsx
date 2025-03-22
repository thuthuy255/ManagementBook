import { showToast } from 'components/notification/CustomToast';
import { createContext, useContext, useEffect, useState } from 'react';
import { addCategory, getProducts } from 'services/clients/product';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async (payload, append = false) => {
    try {
      setLoading(true);
      const response = await getProducts({ ...payload });
      const newProducts = response?.data?.rows || [];

      if (append) {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewProducts = newProducts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...uniqueNewProducts];
        });
      } else {
        setProducts(newProducts);
      }

      setTotalPage(response?.totalPage || 1);
      setLoading(false);
      return newProducts;
    } catch (error) {
      console.error('Fetch Products Error', error);
      setLoading(false);
      return [];
    }
  };

  const addToCart = async (product) => {
    const payload = {
      productID: product?.id,
      qty: 1
    };
    const response = await addCategory(payload);
    const { err, mess } = response;
    if (response) return showToast(mess, err === 0 ? 'success' : 'error');
    setCart((prev) => [...prev, product]);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ products, fetchProducts, cart, addToCart, totalPage, loading }}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
