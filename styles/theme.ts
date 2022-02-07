import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  components: {
    Input: {
      variants: {
        filled: {
          field: {
            borderRadius: '10px',
            backgroundColor: 'object.secondary',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    NumberInput: {
      variants: {
        filled: {
          field: {
            borderRadius: '10px',
            backgroundColor: 'object.secondary',
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});
