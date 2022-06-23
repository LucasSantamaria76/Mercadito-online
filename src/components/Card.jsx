import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  VStack,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Heading,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useStoreCart } from '../store/CartProvider';
import Barcode from 'react-barcode';

const scaledHover = {
  transition: 'transform .4s',
  _hover: { transform: 'scale(1.1)' },
};

const Card = ({ product, addProductToCart }) => {
  const { id, category, description, price, stock, unit, volume } = product;
  const storeCart = useStoreCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Flex
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        mx='auto'
        bg='#dededece'
        boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
        sx={scaledHover}>
        <Image
          src={import.meta.env.VITE_APP_IMAGEN_URL_BASE + id + '.jpg'}
          alt='Imagen producto'
          w='40%'
        />

        <VStack justify='space-evenly' w='60%'>
          <Box m={2} fontWeight='bold' as='h3' lineHeight='tight' noOfLines={1}>
            {description}
          </Box>
          <Box>{`Precio: $ ${price.toFixed(2)}`}</Box>
          <HStack w='90%' justify='space-between'>
            <Button
              ref={finalRef}
              bgColor='brand.primary'
              variant='solid'
              _hover={{
                background: 'transparent',
                border: '2px solid',
                color: 'brand.primary',
              }}
              _active={{ boxShadow: 'none' }}
              onClick={onOpen}>
              ver más...
            </Button>

            <Box pos='relative'>
              {storeCart.cart.find((el) => el.id === id) && (
                <Badge bg='#CD6155' color='white' pos='absolute' top={0}>
                  {storeCart.cart.find((el) => el.id === id).quantity}
                </Badge>
              )}

              <Text as='button' fontSize={30} onClick={() => addProductToCart(id)}>
                🛒
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Flex>

      <Modal size={'4xl'} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                  bg='#a91f1f'
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
                    disabled={!storeCart.cart.find((el) => el.id === id)?.quantity}>
                    -
                  </Button>
                  <Button _disabled={{ bg: '#c4c4c4', boxShadow: 'none' }} disabled={!stock}>
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
};

export default Card;
