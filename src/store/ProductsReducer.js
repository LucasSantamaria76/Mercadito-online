import Types from './Types';

export const initialProducts = [
  {
    id: '',
    description: '',
    stock: 0,
    price: 0,
    image: '',
    category: '',
  },
];

const ProductsReducer = (state, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS:
      return [...action.payload];
    case Types.ADD_STOCK:
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, stock: product.stock + action.payload.quantity }
          : product
      );
    case Types.REDUCE_STOCK:
      return state.map((product) =>
        product.id === action.payload.id ? { ...product, stock: product.stock - 1 } : product
      );
    default:
      return state;
  }
};

export default ProductsReducer;
