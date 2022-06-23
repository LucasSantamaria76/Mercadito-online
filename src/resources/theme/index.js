// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    primary: '#78909C',
    800: '#153e75',
    700: '#2a69ac',
    600: '#5e9ed6',
    500: '#73bef3',
    400: '#91d9fd',
    300: '#acc8ff',
    200: '#d3eaff',
    100: '#f4faff',
    50: '#fafcfd',
    25: '#fafafa',
    0: '#fafafa',
  },
};

const Button = {
  baseStyle: {
    boxShadow: '2px 2px 8px 0px rgba(0,0,0,0.75)',
  },
  variants: {
    rounded: (props) => ({
      bg: props.colorScheme,
      borderRadius: '30px',
      border: '1px solid',
    }),

    /*  {
      borderRadius: '30px',
      border: '1px solid',
    }, */
  },
};

export const theme = extendTheme({ colors, components: { Button } });
