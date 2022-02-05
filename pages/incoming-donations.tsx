import type { NextPage } from 'next'
import { useSettingsContext } from '../core/utils/settings';

const CampaignSettings: NextPage = () => {

  const {settings} = useSettingsContext();

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <label>Incoming donations widget</label>
      </section>
    </main>
  )
}

export default CampaignSettings
