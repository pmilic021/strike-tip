import type { NextPage } from 'next'
import { useSettingsContext } from '../lib/utils/settings';

const PaymentPage: NextPage = () => {
  const {settings} = useSettingsContext();

  return (
    <main>
      <div>{JSON.stringify(settings)}</div>
      <section>
        <button onClick={() => getPaymentStatus(settings.username)}>ZZTip</button>
      </section>
    </main>
  )
}

const getPaymentStatus = async (username: string): Promise<void> => {
  await fetch(`/api/users/${username}/zztip`);
};

export default PaymentPage
