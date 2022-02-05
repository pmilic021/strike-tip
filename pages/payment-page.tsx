import type { NextPage } from 'next'
import { useSettingsContext } from '../core/utils/settings';
import { TipInfo } from '../core/data/models';
import { useFirebaseContext } from '../core/data/firebase';
import { useCallback, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import useTipsSubscription from '../core/data/use-tips-subscription';

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
