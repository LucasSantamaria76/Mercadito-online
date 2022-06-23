import { Badge, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useStoreCart } from '../store/CartProvider';

const brandStyled = {
  fontFamily: 'Pacifico, cursive',
  color: 'white',
  textShadow: '3px 5px 2px #474747',
  fontWeight: 'bold',
  fontSize: '40px',
};

const Navbar = () => {
  const storeCart = useStoreCart();
  return (
    <Flex
      w='100%'
      h='70px'
      bgColor='brand.primary'
      color='white'
      boxShadow='0px 0px 10px 3px #000000'>
      <Box mx={4} pt={1}>
        <Text sx={brandStyled}>Mercadito online</Text>
      </Box>
      <Spacer />
      <Box w={20}>
        <Badge bg='#CD6155' color='white' pos='absolute' top={3}>
          {storeCart.cart.reduce((acc, value) => (acc += value.quantity), 0)}
        </Badge>
        <Text sx={brandStyled}>🛒</Text>
      </Box>
    </Flex>
  );
};

export default Navbar;
