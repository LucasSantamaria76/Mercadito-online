import { createContext, useContext, useReducer } from 'react';
import ProductsReducer, { initialProducts } from './ProductsReducer.js';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => (
  <ProductsContext.Provider value={useReducer(ProductsReducer, initialProducts)}>
    {children}
  </ProductsContext.Provider>
);

const useStoreProducts = () => useContext(ProductsContext)[0];
const useDispatchProducts = () => useContext(ProductsContext)[1];

export { ProductsContext, useStoreProducts, useDispatchProducts };
export default ProductsProvider;
