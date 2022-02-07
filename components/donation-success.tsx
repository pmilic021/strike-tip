import { useSettingsContext } from '../lib/utils/settings';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Text, Container, Button } from '@chakra-ui/react';

type Props = { onDonateAgain: () => void };

export const DonationSuccess = ({ onDonateAgain }: Props) => {
  const { settings } = useSettingsContext();

  return (
    <Container centerContent mt={24}>
      <CheckCircleIcon w={24} h={24} color="teal" />
      <Text color="teal" mt={4} fontWeight="bold" fontSize="xl">
        Successfully donated to {settings.username}!
      </Text>
      <Button mt={8} onClick={onDonateAgain}>
        Donate again
      </Button>
    </Container>
  );
};
