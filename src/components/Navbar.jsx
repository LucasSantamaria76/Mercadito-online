import {
  Badge,
  Box,
  Flex,
  Spacer,
  Text,
  Icon,
  useDisclosure,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useStoreCart } from '../store/CartProvider';
import CartDrawer from './CartDrawer';
import { FaRegUser } from 'react-icons/fa';
import ModalLogin from './ModalLogin';
import { useAuth } from '../firebase/authContext';
import { auth } from '../firebase/firebase_config';
import { signOut } from 'firebase/auth';

const brandStyled = {
  fontFamily: 'Pacifico, cursive',
  color: 'white',
  textShadow: '3px 5px 2px #474747',
  fontWeight: 'bold',
  fontSize: '40px',
};

const Navbar = () => {
  /*  const { logout } = useAuth; */
  const storeCart = useStoreCart();
  const [showCart, toggleShowCart] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {console.log(storeCart.user)}
      <Flex
        w='100%'
        h='70px'
        bgColor='brand.primary'
        color='white'
        boxShadow='0px 0px 10px 3px #000000'
        pos={'absolute'}
        zIndex={9999}>
        <Box mx={4} pt={1}>
          <Text sx={brandStyled}>Mercadito online</Text>
        </Box>
        <Spacer />
        {storeCart?.user?.displayName ? (
          <VStack mr={'30px'} mt={'10px'}>
            {console.log('entre')}
            <Avatar
              size='sm'
              name={storeCart.user.displayName}
              src='storeCart.user.photoURL'
              onClick={() => signOut(auth)}
            />
            <sub>{storeCart.user.displayName}</sub>
          </VStack>
        ) : (
          <Icon
            as={FaRegUser}
            m={5}
            mr={'50px'}
            color='whiteAlpha.700'
            fontSize='3xl'
            cursor={'pointer'}
            onClick={onOpen}
          />
        )}

        <Box mr={5}>
          <Badge bg='#CD6155' color='white' pos='absolute' top={3}>
            {storeCart.product.reduce((acc, value) => (acc += value.quantity), 0)}
          </Badge>
          <Text as='button' sx={brandStyled} onClick={() => toggleShowCart(!showCart)}>
            🛒
          </Text>
        </Box>
      </Flex>
      <CartDrawer isOpen={showCart} onClose={() => toggleShowCart(false)} />;
      <ModalLogin isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
