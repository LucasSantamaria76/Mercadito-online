import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useDispatchCart, useStoreCart } from '../store/CartProvider';
import { useDispatchProducts, useStoreProducts } from '../store/ProductsProvider';
import ItemCart from './ItemCart';
import { BsCartX } from 'react-icons/bs';
import Types from '../store/Types';

function CartDrawer({ isOpen, onClose }) {
  const cart = useStoreCart();
  const products = useStoreProducts();
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
            <Button
              h={'50px'}
              fontSize={'32px'}
              bgColor='#ff3232c6'
              color={'#ccc'}
              onClick={() => emptyCart()}>
              <Icon as={BsCartX} />
            </Button>
            <Divider orientation='horizontal' p='8px' />
          </DrawerHeader>
          <DrawerBody>
            <TableContainer>
              <Table variant='simple' size='sm'>
                <Thead>
                  <Tr>
                    <Th>Foto</Th>
                    <Th align='center'>Descripción</Th>
                    <Th isNumeric>Precio</Th>
                    <Th>Cantidad</Th>
                    <Th isNumeric>Subtotal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.product.length ? (
                    cart.product.map((el) => {
                      const product = products.find((p) => p.id === el.id);
                      product.quantity = el.quantity;
                      return <ItemCart product={product} key={el.id} />;
                    })
                  ) : (
                    <tr>
                      <td colSpan='4'>
                        <h2>No hay productos en el carrito</h2>
                      </td>
                    </tr>
                  )}
                </Tbody>
                <Tfoot>
                  <Tr></Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CartDrawer;
