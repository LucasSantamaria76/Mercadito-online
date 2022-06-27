import Types from './Types';

export const initialCart = {
  user: {},
  product: [],
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_USER:
      return { ...state, user: action.payload };
    case Types.EMPTY_CART:
      return {
        ...state,
        product: [],
      };
    case Types.ADD_PRODUCT_TO_CART: {
      const hasProduct = state.product?.find((product) => product.id === action.payload);
      return hasProduct
        ? {
            ...state,
            product: state.product.map((item) =>
              item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            ),
          }
        : {
            ...state,
            product: [...state.product, { id: action.payload, quantity: 1 }],
          };
    }
    case Types.REDUCE_QUANTITY_PRODUCT_TO_CART: {
      const newCartProduct = state.product
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      return {
        ...state,
        product: newCartProduct,
      };
    }
    default:
      return state;
  }
};

export default CartReducer;
