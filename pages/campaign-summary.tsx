import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { DonationInfo } from '../lib/data/models';
import { ReactElement, useCallback, useState } from 'react';
import useTipsSubscription from '../lib/data/use-tips-subscription';
import styles from '../styles/EmbeddableWidget.module.scss';
import NumberFormat from 'react-number-format';

const TOP_DONORS_COUNT = 3;

const CampaignSummary: NextPage = () => {
  const { settings } = useSettingsContext();

  const [topDonations, setTopDonations] = useState<DonationInfo[]>([
    { amount: 2.5, donor: 'MrJAck' },
    { amount: 21.5, donor: 'MrJAckf' },
    { amount: 20.5, donor: 'MrJAckdasfasdfasdf' },
    { amount: 20, donor: 'MrJAck' },
  ] as DonationInfo[]);
  const [donationSum, setDonationSum] = useState<number>(0);

  const callback = useCallback(
    (donation: DonationInfo) => {
      setTopDonations((topDonations) =>
        [...topDonations, donation]
          .sort((a, b) => (a.amount > b.amount ? 1 : -1))
          .splice(TOP_DONORS_COUNT)
      );
      setDonationSum((s) => s + donation.amount);
    },
    [setTopDonations, setDonationSum]
  );

  useTipsSubscription(settings.username, callback);

  return (
    <main className={styles.embeddableWidget}>
      <section className={styles.topDonor}>
        <label>TOP DONORS:</label>
        {topDonations.length > 0 ? (
          topDonations.map((topDonation) => topDonationContainer(topDonation))
        ) : (
          <div>N/A</div>
        )}
      </section>
      <div></div>
    </main>
  );
};

function topDonationContainer(donation: DonationInfo): ReactElement {
  return (
    <div className={styles.topDonation}>
      <NumberFormat
        className={styles.amount}
        value={donation.amount}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        decimalScale={2}
        fixedDecimalScale={true}
      />
      {donation.donor && <span className={styles.donor}>{donation.donor}</span>}
    </div>
  );
}

export default CampaignSummary;
