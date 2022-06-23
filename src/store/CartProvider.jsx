import { createContext, useContext, useReducer } from 'react';
import CartReducer, { initialCart } from './CartReducer.js';

const CartContext = createContext();

const CartProvider = ({ children }) => (
  <CartContext.Provider value={useReducer(CartReducer, initialCart)}>
    {children}
  </CartContext.Provider>
);

const useStoreCart = () => useContext(CartContext)[0];
const useDispatchCart = () => useContext(CartContext)[1];

export { CartContext, useStoreCart, useDispatchCart };
export default CartProvider;
