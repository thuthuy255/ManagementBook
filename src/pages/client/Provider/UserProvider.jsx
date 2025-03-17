import { ProductProvider } from "../pages/product/context/ProductContext";


export default function UserProvider({ children }) {
  return (
    <ProductProvider>
        {children}
    </ProductProvider>
  );
}
