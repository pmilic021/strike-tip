import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <Container as="main" py={50}>
      {children}
    </Container>
  );
};

export default Layout;
