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

    default:
      return state;
  }
};

export default ProductsReducer;
