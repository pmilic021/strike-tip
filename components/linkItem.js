import Image from 'next/image';
import {
  Button,
  Text,
  HStack,
  Box,
  Link,
  useClipboard,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';

export default function LinkItem({ header, pathname, query, absPath, image }) {
  const { hasCopied, onCopy } = useClipboard(absPath);

  return (
    <HStack spacing="14px">
      <Box>
        <NextLink
          href={{
            pathname: pathname,
            query: query,
          }}
        >
          <Link>
            <Image src={`/images/${image}`} height={65} width={65} />
          </Link>
        </NextLink>
      </Box>
      <Box>
        <Text fontSize="3xl">{header}</Text>
      </Box>
      <Box>
        <Button height={65} width={65} onClick={onCopy}>
          {hasCopied ? <CheckIcon /> : <CopyIcon />}{' '}
        </Button>
      </Box>
    </HStack>
  );
}
