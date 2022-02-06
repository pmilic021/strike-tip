import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import useTipsSubscription from '../lib/data/use-tips-subscription';
import { useCallback, useState } from 'react';
import { DonationInfo } from '../lib/data/models';

const IncomingDonations: NextPage = () => {
  const { settings } = useSettingsContext();
  const [lastTip, setLastTip] = useState<DonationInfo | undefined>();

  const callback = useCallback(
    (tip) => {
      console.log(tip);
      setLastTip(tip);
    },
    [setLastTip]
  );

  useTipsSubscription(settings.username, callback);

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Incoming donations widget</label>
        {lastTip && <div>{JSON.stringify(lastTip)}</div>}
      </section>
    </main>
  );
};

export default IncomingDonations;
