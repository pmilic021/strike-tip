import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import useTipsSubscription from '../lib/data/use-tips-subscription';
import { ReactNode, useCallback } from 'react';
import { DonationInfo } from '../lib/data/models';
import { Center, useToast } from '@chakra-ui/react';
import styles from '../styles/EmbeddableWidget.module.scss';

const IncomingDonations: NextPage = () => {
  const { settings } = useSettingsContext();
  const toast = useToast();

  const callback = useCallback(
    (tip) => {
      toast({
        position: 'bottom',
        render: donationSplash(tip),
      });
    },
    [toast]
  );

  useTipsSubscription(settings.username, callback);

  return null;
};

function donationSplash(donation: DonationInfo): () => ReactNode {
  const render = () => (
    <Center
      p={3}
      flexDirection="column"
      justifyContent="stretch"
      className={styles.incomingDonation}
    >
      <span>
        {donation.donor}{' '}
        <span className={styles.amount}>{donation.amount}$</span>
      </span>
      <span>{donation.message}</span>
    </Center>
  );

  return render;
}

export default IncomingDonations;
