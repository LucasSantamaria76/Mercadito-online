import { Grid, GridItem } from '@chakra-ui/react';
import { useDispatchCart } from '../store/CartProvider';
import { useStoreProducts } from '../store/ProductsProvider';
import Types from '../store/Types';
import Card from './Card';

const ListProducts = () => {
  const products = useStoreProducts();
  const dispatchCart = useDispatchCart();

  const addProductToCart = (id) => {
    dispatchCart({ type: Types.ADD_PRODUCT_TO_CART, payload: id });
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: 'repeat(auto-fit, minmax(400px,1fr))',
        }}
        gap={4}
        m={8}>
        {products.map((product) => (
          <GridItem key={product.id}>
            <Card product={product} addProductToCart={addProductToCart} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default ListProducts;
