import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { TipInfo } from '../lib/data/models';
import { useCallback, useState } from 'react';
import useTipsSubscription from '../lib/data/use-tips-subscription';

const CampaignSummary: NextPage = () => {
  const [tips, setTips] = useState<TipInfo[]>([]);
  const { settings } = useSettingsContext();

  const callback = useCallback(
    (tip) => {
      console.log(tip);
      setTips((t) => [...t, tip]);
    },
    [setTips]
  );

  useTipsSubscription(settings.username, callback);

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Campaign summary widget</label>
      </section>
      <div>
        {tips.map((tip) => (
          <div key={tip.id}>{JSON.stringify(tip)}</div>
        ))}
      </div>
    </main>
  );
};

export default CampaignSummary;
