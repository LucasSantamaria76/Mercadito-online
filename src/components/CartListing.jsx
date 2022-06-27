import { Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

import ItemCart from './ItemCart';

import { parseCurrency } from './../utils/utils';
import { useStoreProducts } from '../store/ProductsProvider';

const CartListing = ({ cart }) => {
  const products = useStoreProducts();

  return (
    <>
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>Foto</Th>
              <Th align='center'>Descripción</Th>
              <Th isNumeric>Precio</Th>
              <Th>Cantidad</Th>
              <Th isNumeric>Subtotal</Th>
              <Th></Th>
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
              <Tr>
                <Td colSpan='4'>
                  <Text fontSize='3xl' mt='20px'>
                    No hay productos en el carrito
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot bg={'#b6c4c9'}>
            {cart.product.length ? (
              <Tr>
                <Td colSpan='5'>
                  <Text fontSize='2xl' my='20px'>
                    {` Total de la compra: 
                        ${parseCurrency(
                          cart.product.reduce((total, prod) => {
                            const productPrice = products.find((p) => p.id === prod.id).price;
                            return (total += productPrice * prod.quantity);
                          }, 0)
                        )}
                        `}
                  </Text>
                </Td>
              </Tr>
            ) : (
              <tr></tr>
            )}
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartListing;
