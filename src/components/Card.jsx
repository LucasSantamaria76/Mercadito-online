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
} from '@chakra-ui/react';

import { useStoreCart } from '../store/CartProvider';
import ModalProduct from './ModalProduct';

const scaledHover = {
  transition: 'transform .3s',
  _hover: { transform: 'scale(1.02)' },
};

const Card = ({ product, addProductToCart }) => {
  const { id, description, price, stock } = product;
  const storeCart = useStoreCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        pos={'relative'}
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        mx='auto'
        h='140px'
        bg='#dedede7d'
        boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
        sx={scaledHover}>
        {!stock && (
          <Badge
            fontSize='xl'
            textAlign={'center'}
            w={145}
            pos='absolute'
            top={50}
            left={1}
            bg='#a91f1f76'
            color='white'>
            Sin Stock
          </Badge>
        )}
        <Image
          src={import.meta.env.VITE_APP_IMAGEN_URL_BASE + id + '.jpg'}
          alt='Imagen producto'
          w='35%'
        />

        <VStack justify='space-evenly' w='65%'>
          <Box m={2} fontWeight='bold' as='h3' lineHeight='tight' noOfLines={1}>
            {description}
          </Box>
          <Box>{`Precio: $ ${price.toFixed(2)}`}</Box>
          <HStack w='90%' justify='space-between'>
            <Button
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
              {storeCart.product.find((el) => el.id === id) && (
                <Badge bg='#CD6155' color='white' pos='absolute' top={0}>
                  {storeCart.product.find((el) => el.id === id).quantity}
                </Badge>
              )}

              <Text as='button' fontSize={30} onClick={() => addProductToCart(id)}>
                🛒
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Flex>
      <ModalProduct
        product={product}
        isOpen={isOpen}
        onClose={onClose}
        addProductToCart={addProductToCart}
      />
    </>
  );
};

export default Card;
