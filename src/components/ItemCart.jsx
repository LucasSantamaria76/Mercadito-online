import { Button, Image, Td, Tr } from '@chakra-ui/react';
import { useDispatchCart } from '../store/CartProvider';
import { useDispatchProducts } from '../store/ProductsProvider';
import Types from '../store/Types';
import { parseCurrency } from './../utils/utils';

export default function ItemCart({ product }) {
  const { id, description, price, quantity } = product;
  const dispatchCart = useDispatchCart();
  const dispatchProducts = useDispatchProducts();

  const reduceQuantityProductToCart = (id) => {
    dispatchCart({ type: Types.REDUCE_QUANTITY_PRODUCT_TO_CART, payload: id });
    dispatchProducts({ type: Types.ADD_STOCK, payload: { id, quantity: 1 } });
  };

  return (
    <>
      <Tr>
        <Td>
          {' '}
          <Image w='70px' src={import.meta.env.VITE_APP_IMAGEN_URL_BASE + id + '.jpg'} alt={id} />
        </Td>
        <Td>{`${description.substring(0, 40)}...`}</Td>
        <Td isNumeric>{parseCurrency(price)}</Td>
        <Td>
          <Button h='25px' onClick={() => reduceQuantityProductToCart(id)}>
            -
          </Button>
          <Button h='25px' disabled>
            {quantity}
          </Button>
          <Button h='25px'>+</Button>
        </Td>
        <Td isNumeric>{parseCurrency(price * quantity)}</Td>
      </Tr>
    </>
  );
}
