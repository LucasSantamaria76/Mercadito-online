import { Button, Image, Td, Tr, Center, HStack, Icon } from '@chakra-ui/react';
import { useDispatchCart } from '../store/CartProvider';
import { useDispatchProducts } from '../store/ProductsProvider';
import Types from '../store/Types';
import { parseCurrency } from './../utils/utils';
import { BsCartX } from 'react-icons/bs';

export default function ItemCart({ product }) {
  const { id, description, price, quantity, stock } = product;
  const dispatchCart = useDispatchCart();
  const dispatchProducts = useDispatchProducts();

  const reduceQuantityProductToCart = (id, quantity) => {
    dispatchCart({ type: Types.REDUCE_QUANTITY_PRODUCT_TO_CART, payload: { id, quantity } });
    dispatchProducts({ type: Types.ADD_STOCK, payload: { id, quantity } });
  };

  const addQuantityProductToCart = (id) => {
    dispatchCart({ type: Types.ADD_PRODUCT_TO_CART, payload: id });
    dispatchProducts({ type: Types.REDUCE_STOCK, payload: { id } });
  };

  return (
    <>
      <Tr>
        <Td>
          <Image w='70px' src={Types.URL_BASE + id + '.jpg'} alt={id} />
        </Td>
        <Td>{`${description.substring(0, 40)}...`}</Td>
        <Td isNumeric>{parseCurrency(price)}</Td>
        <Td>
          <HStack>
            <Button h='25px' onClick={() => reduceQuantityProductToCart(id, 1)}>
              -
            </Button>
            <Center
              fontSize='md'
              textAlign={'center'}
              w={'40px'}
              h={'28px'}
              borderRadius='8px'
              bg='#7d83827d'
              color='white'>
              {quantity}
            </Center>
            <Button
              h='25px'
              _disabled={{ bg: '#c4c4c4', boxShadow: 'none' }}
              disabled={!stock}
              onClick={() => addQuantityProductToCart(id)}>
              +
            </Button>
          </HStack>
        </Td>
        <Td isNumeric>{parseCurrency(price * quantity)}</Td>
        <Td>
          <Icon
            as={BsCartX}
            color='red.500'
            fontSize='lg'
            cursor={'pointer'}
            onClick={() => reduceQuantityProductToCart(id, quantity)}
          />
        </Td>
      </Tr>
    </>
  );
}
