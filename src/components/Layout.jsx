import { useEffect } from 'react';
import { getProducts } from '../firebase/getProducts';
import { useDispatchProducts } from '../store/ProductsProvider';
import Types from '../store/Types';
import ListProducts from './ListProducts';
import Navbar from './Navbar';

const Layout = () => {
  const dispatchProducts = useDispatchProducts();

  const setStoreProducts = async () => {
    const products = await getProducts();
    dispatchProducts({ type: Types.GET_PRODUCTS, payload: products });
  };

  useEffect(() => {
    setStoreProducts();
  }, []);

  return (
    <>
      <Navbar />
      <ListProducts />
    </>
  );
};

export default Layout;
