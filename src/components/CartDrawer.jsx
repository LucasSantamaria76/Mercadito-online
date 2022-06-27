import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useDispatchCart, useStoreCart } from '../store/CartProvider';
import { useDispatchProducts } from '../store/ProductsProvider';

import { BsCartX } from 'react-icons/bs';
import Types from '../store/Types';
import CartListing from './CartListing';

function CartDrawer({ isOpen, onClose }) {
  const cart = useStoreCart();

  const dispatchCart = useDispatchCart();
  const dispatchProducts = useDispatchProducts();

  const emptyCart = () => {
    cart.product.forEach((el) =>
      dispatchProducts({ type: Types.ADD_STOCK, payload: { id: el.id, quantity: el.quantity } })
    );
    dispatchCart({ type: Types.EMPTY_CART });
  };

  return (
    <>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent mt={'70px'}>
          <DrawerHeader>
            <HStack>
              <Text fontSize='4xl'>{`Carrito (${cart.product.reduce(
                (acc, value) => (acc += value.quantity),
                0
              )})`}</Text>
              <Spacer />
              <Button
                h={'50px'}
                fontSize={'32px'}
                bgColor='#ff3232c6'
                color={'#ccc'}
                onClick={() => emptyCart()}>
                <Icon as={BsCartX} />
              </Button>
            </HStack>
            <Divider orientation='horizontal' p='8px' />
          </DrawerHeader>
          <DrawerBody>
            <CartListing cart={cart} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CartDrawer;
