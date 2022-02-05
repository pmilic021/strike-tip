import type { NextPage } from 'next'
import { useSettingsContext } from '../core/utils/settings';
import { TipInfo } from '../core/data/models';

const CampaignSettings: NextPage = () => {

  const {settings} = useSettingsContext();

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Campaign summary widget</label>
      </section>
    </main>
  )
}

const getTipsForUser = async (username: string, tipsAfterTimestamp: number): Promise<TipInfo[]> => {
  const response = await fetch(`/api/users/${username}/tips?tipsAfter=${tipsAfterTimestamp}`);
  return await response.json();
};

export default CampaignSettings
