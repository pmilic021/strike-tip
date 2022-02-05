import type { NextPage } from 'next'
import { useSettingsContext } from '../core/utils/settings';
import { TipInfo } from '../core/data/models';
import { useFirebaseContext } from '../core/data/firebase';
import { useCallback, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import useTipsSubscription from '../core/data/use-tips-subscription';

const CampaignSummary: NextPage = () => {

  const [tips, setTips] = useState<TipInfo[]>([]);
  const {settings} = useSettingsContext();

  const callback = useCallback(tip => {
    console.log(tip);
    setTips(t => [...t, tip]);
  }, [setTips]);

  useTipsSubscription(settings.username, callback);

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Campaign summary widget</label>
      </section>
      <div>
        {tips.map(tip => <div key={tip.id}>{JSON.stringify(tip)}</div>)}
      </div>
    </main>
  )
}

export default CampaignSummary
