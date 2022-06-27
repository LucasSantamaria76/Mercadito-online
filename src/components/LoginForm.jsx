import { Input, Stack, HStack, Button, Link } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = ({ gotoRegister }) => {
  return (
    <>
      <Stack spacing={4}>
        <Input type='email' placeholder='Ingrese su e-mail' />
        <Input type='password' placeholder='Ingrese una contraseña' />
        <Link color='teal.500' onClick={gotoRegister} textAlign={'center'}>
          No tienes cuenta? Registrate gratis aquí...
        </Link>
        <HStack w={'100%'}>
          <Button w={'50%'} type='submit' bg='brand.primary'>
            Registrarse
          </Button>
          <Button
            w={'50%'}
            type='submit'
            bg='brand.primary'
            leftIcon={<FcGoogle fontSize={'30px'} />}>
            Registrarse con Google
          </Button>
        </HStack>
      </Stack>
    </>
  );
};

export default LoginForm;
