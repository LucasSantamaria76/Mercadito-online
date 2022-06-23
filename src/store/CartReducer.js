import Types from './Types';

export const initialCart = {
  userId: '',
  cart: [],
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case Types.ADD_PRODUCT_TO_CART: {
      const hasProduct = state.cart?.find((product) => product.id === action.payload);
      return hasProduct
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { id: action.payload, quantity: 1 }],
          };
    }
    default:
      return state;
  }
};

export default CartReducer;
