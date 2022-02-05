import type { NextPage } from 'next'
import { useSettingsContext } from '../core/utils/settings';
import useTipsSubscription from '../core/data/use-tips-subscription';
import { useCallback, useState } from 'react';
import { TipInfo } from '../core/data/models';

const IncomingDonations: NextPage = () => {

  const {settings} = useSettingsContext();
  const [lastTip, setLastTip] = useState<TipInfo | undefined>();

  const callback = useCallback(tip => {
    console.log(tip);
    setLastTip(tip)
  }, [setLastTip]);

  useTipsSubscription(settings.username, callback);

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Incoming donations widget</label>
        {lastTip && <div>{JSON.stringify(lastTip)}</div>}
      </section>
    </main>
  )
}

export default IncomingDonations
