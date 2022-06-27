import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useDispatchCart, useStoreCart } from '../store/CartProvider';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function ModalLogin({ isOpen, onClose }) {
  const storeCart = useStoreCart();
  const dispatchCart = useDispatchCart();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader mb={'30px'} boxShadow='rgba(0, 0, 0, 0.536) 0px 3px 8px'>
            Inicio de sesión
          </ModalHeader>
          <ModalBody>
            {isLogin ? (
              <LoginForm gotoRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm gotoLogin={() => setIsLogin(true)} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
