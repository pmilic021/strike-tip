import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
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
