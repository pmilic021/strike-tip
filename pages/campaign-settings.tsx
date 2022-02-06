import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import Link from 'next/link';

const CampaignSettings: NextPage = () => {
  const { settingsQueryParam } = useSettingsContext();

  return (
    <main>
      <section>
        <h6>Campaign summary widget</h6>
        <Link
          href={{
            pathname: '/campaign-summary',
            query: settingsQueryParam,
          }}
        >
          {`${window.location.host}/campaign-summary?${settingsQueryParam}`}
        </Link>
      </section>
      <section>
        <h6>Incoming donations widget</h6>
        <Link
          href={{
            pathname: '/incoming-donations',
            query: settingsQueryParam,
          }}
        >
          {`${window.location.host}/incoming-donations?${settingsQueryParam}`}
        </Link>
      </section>
      <section>
        <h6>Payment page</h6>
        <Link
          href={{
            pathname: '/payment-page',
            query: settingsQueryParam,
          }}
        >
          {`${window.location.host}/donation?${settingsQueryParam}`}
        </Link>
      </section>
    </main>
  );
};

export default CampaignSettings;
