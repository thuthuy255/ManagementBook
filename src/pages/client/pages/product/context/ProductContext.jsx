import { createContext, useContext, useEffect, useState } from 'react';
import { getProducts } from 'services/clients/product';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (payload) => {
    try {
      setLoading(true);
      const response = await getProducts(payload);
      setProducts(response?.data?.rows);
      setTotalPage(response?.totalPage);
      setLoading(false);
    } catch (error) {
      console.error('Fetch Products Error', error);
    }
  };

  const addToCart = (product) => {
    console.log(product);
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
