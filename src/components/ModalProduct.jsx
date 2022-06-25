import {
  Badge,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Heading,
} from '@chakra-ui/react';
import Barcode from 'react-barcode';
import { useDispatchCart, useStoreCart } from '../store/CartProvider';
import { useDispatchProducts } from '../store/ProductsProvider';
import Types from '../store/Types';

export default function ModalProduct({ product, isOpen, onClose, addProductToCart }) {
  const { id, category, description, price, stock, unit, volume } = product;
  const storeCart = useStoreCart();
  const dispatchCart = useDispatchCart();
  const dispatchProducts = useDispatchProducts();

  const reduceQuantityProductToCart = (id) => {
    dispatchCart({ type: Types.REDUCE_QUANTITY_PRODUCT_TO_CART, payload: id });
    dispatchProducts({ type: Types.ADD_STOCK, payload: { id, quantity: 1 } });
  };

  return (
    <>
      <Modal size={'4xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader boxShadow='rgba(0, 0, 0, 0.536) 0px 3px 8px'>
            <Heading as='h2' size='xl' fontWeight='bold'>
              {description}
            </Heading>
          </ModalHeader>
          <ModalBody pos={'relative'}>
            <HStack justify='space-between'>
              {!stock && (
                <Badge
                  fontSize='3xl'
                  textAlign={'center'}
                  w={300}
                  pos='absolute'
                  top={150}
                  left={20}
                  bg='#a91f1f76'
                  color='white'>
                  Sin Stock
                </Badge>
              )}
              <Image
                src={import.meta.env.VITE_APP_IMAGEN_URL_BASE + id + '.jpg'}
                alt='Producto'
                boxSize='400px'
              />
              <VStack w='60%' spacing='24px'>
                <Text fontSize='2xl'>{`Precio: $ ${price.toFixed(2)}`}</Text>
                <Text fontSize='2xl'>{`Stock:  ${stock}`}</Text>
                <Text fontSize='md'>{`Categoria:  ${category}`}</Text>
                <HStack>
                  <Button
                    _disabled={{ bg: '#c4c4c4', boxShadow: 'none' }}
                    disabled={!storeCart.product.find((el) => el.id === id)?.quantity}
                    onClick={() => reduceQuantityProductToCart(id)}>
                    -
                  </Button>
                  <Badge
                    fontSize='2xl'
                    textAlign={'center'}
                    w={'60px'}
                    bg='#55766fc5'
                    color='white'>
                    {storeCart.product.find((el) => el.id === id)?.quantity}
                  </Badge>
                  <Button
                    _disabled={{ bg: '#c4c4c4', boxShadow: 'none' }}
                    disabled={!stock}
                    onClick={() => addProductToCart(id)}>
                    +
                  </Button>
                </HStack>
                <Text fontSize='md'>
                  <Barcode
                    value={id}
                    displayValue={true}
                    height={50}
                    format={'EAN13'}
                    font='Avenir Next'
                    fontOptions='500'
                    textMargin={2}
                    margin={0}
                  />
                </Text>
                <Text fontSize='sm'>{`Precio por ${unit} $ ${(price * (1 / volume)).toFixed(
                  2
                )}`}</Text>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
