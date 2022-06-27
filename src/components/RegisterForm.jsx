import { Button, HStack, Input, Link, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../firebase/authContext';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, 'Solo puede contener letras')
    .required('Debe ingresar un nombre'),
  email: yup.string().email('Ingrese un e-mail válido').required('Debe ingresar un E-mail'),
  address: yup.string(),
  phone: yup
    .number()
    .positive()
    .integer()
    .min(6, 'Debe ingresar un teléfono con 6 dígitos como mínimo'),
  password: yup
    .string()
    .required('Debe ingresar una contaseña')
    .min(4, 'La contaseña debe tener 4 caracteres como mínimo'),
  repeatPassword: yup
    .string()
    .required('Debe repetir la contaseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no son iguales'),
});

const RegisterForm = ({ gotoLogin }) => {
  const { loginWithGoogle } = useAuth();
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: (formData, { resetForm }) => {
      console.log(formData);
      resetForm();
    },
  });
  const { name, email, address, phone, password, repeatPassword } = values;

  const handleLoginGoogle = () => {
    loginWithGoogle();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input
            type='text'
            name='name'
            placeholder='Ingrese su nombre y apellido'
            onChange={handleChange}
            value={name}
          />
          {touched.name && errors.name && <Text color='#ff0707e5'>{errors.name}</Text>}
          <Input
            type='text'
            name='email'
            placeholder='Ingrese su e-mail'
            onChange={handleChange}
            value={email}
          />
          {touched.email && errors.email && <Text color='#ff0707e5'>{errors.email}</Text>}
          <Input
            type='text'
            name='address'
            placeholder='Ingrese su dirección'
            onChange={handleChange}
            value={address}
          />
          {touched.address && errors.address && <Text color='#ff0707e5'>{errors.address}</Text>}
          <Input
            type='tel'
            name='phone'
            placeholder='Número de teléfono'
            onChange={handleChange}
            value={phone}
          />
          {touched.phone && errors.phone && <Text color='#ff0707e5'>{errors.phone}</Text>}
          <Input
            type='password'
            name='password'
            placeholder='Ingrese una contraseña'
            onChange={handleChange}
            value={password}
          />
          {touched.password && errors.password && <Text color='#ff0707e5'>{errors.password}</Text>}
          <Input
            type='password'
            name='repeatPassword'
            placeholder='Repita la contraseña'
            onChange={handleChange}
            value={repeatPassword}
          />
          {touched.repeatPassword && errors.repeatPassword && (
            <Text color='#ff0707e5'>{errors.repeatPassword}</Text>
          )}
          <Link color='teal.500' onClick={gotoLogin} textAlign={'center'}>
            Ya tienes cuenta? Inicia sesión aquí...
          </Link>
          <HStack w={'100%'}>
            <Button w={'50%'} type='submit' bg='brand.primary'>
              Registrarse
            </Button>
            <Button
              w={'50%'}
              bg='brand.primary'
              onClick={() => handleLoginGoogle()}
              leftIcon={<FcGoogle fontSize={'30px'} />}>
              Registrarse con Google
            </Button>
          </HStack>
        </Stack>
      </form>
    </>
  );
};

export default RegisterForm;
