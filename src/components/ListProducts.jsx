import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useDispatchCart } from '../store/CartProvider';
import { useDispatchProducts, useStoreProducts } from '../store/ProductsProvider';
import Types from '../store/Types';
import Card from './Card';

const ListProducts = () => {
  const products = useStoreProducts();
  const dispatchCart = useDispatchCart();
  const dispatchProducts = useDispatchProducts();

  const addProductToCart = (id) => {
    if (products.find((p) => p.id === id).stock) {
      dispatchCart({ type: Types.ADD_PRODUCT_TO_CART, payload: id });
      dispatchProducts({ type: Types.REDUCE_STOCK, payload: { id, quantity: 1 } });
    }
  };

  return (
    <>
      <Box w='98vw' h='85vh' overflow={'auto'} mt='45px'>
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
      </Box>
    </>
  );
};

export default ListProducts;
