import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { DonationInfo } from '../lib/data/models';
import { ReactElement, useCallback, useState } from 'react';
import useTipsSubscription from '../lib/data/use-tips-subscription';
import styles from '../styles/EmbeddableWidget.module.scss';
import NumberFormat from 'react-number-format';
import { Progress } from '@chakra-ui/react';
import QR from 'qrcode.react';

const TOP_DONORS_COUNT = 3;

const CampaignSummary: NextPage = () => {
  const { settings, settingsQueryParam } = useSettingsContext();

  const [topDonations, setTopDonations] = useState<DonationInfo[]>([]);
  const [donationSum, setDonationSum] = useState<number>(0);

  const callback = useCallback(
    (donation: DonationInfo) => {
      setTopDonations((topDonations) =>
        [...topDonations, donation]
          .sort((a, b) => (a.amount < b.amount ? 1 : -1))
          .slice(0, TOP_DONORS_COUNT)
      );
      setDonationSum((s) => s + donation.amount);
    },
    [setTopDonations, setDonationSum]
  );

  useTipsSubscription(settings.username, callback);

  return (
    <main className={styles.embeddableWidget}>
      {settings.goalAmount &&
        goalProgressContainer(
          donationSum,
          settings.goalAmount,
          settings.goalDescription
        )}
      <QR
        value={`${window.location.host}/campaign-donation?${settingsQueryParam}`}
      />
      <section className={styles.topDonor}>
        <label>TOP DONORS:</label>
        {topDonations.length > 0 ? (
          topDonations.map((topDonation) => topDonationContainer(topDonation))
        ) : (
          <div className={styles.topDonation}>Be the first to donate!</div>
        )}
      </section>
    </main>
  );
};

function goalProgressContainer(
  current: number,
  goal: number,
  description?: string
): ReactElement {
  const progress = (current / goal) * 100;

  return (
    <section className={styles.goalProgress}>
      {description && <span>{description}</span>}
      <span>
        Goal: {renderAmount(current)} / {renderAmount(goal)}
      </span>
      <Progress
        hasStripe={true}
        value={progress || 0.5}
        className={styles.progressBar}
        colorScheme="red"
      />
    </section>
  );
}

function topDonationContainer(donation: DonationInfo): ReactElement {
  return (
    <div className={styles.topDonation} key={donation.id}>
      {renderAmount(donation.amount)}
      <span className={styles.donor}>
        {donation.donor ? donation.donor : 'Anonymous'}
      </span>
    </div>
  );
}

function renderAmount(value: number) {
  return (
    <NumberFormat
      className={styles.amount}
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

export default CampaignSummary;
