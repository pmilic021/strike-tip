import { useFirebaseContext } from './firebase-context';
import { useEffect, useMemo } from 'react';
import { onValue, ref } from 'firebase/database';
import { DonationInfo } from './models';

export default function useTipsSubscription(
  username: string,
  callback: (tip: DonationInfo) => void
) {
  const db = useFirebaseContext();

  const timestampFilter = useMemo(() => new Date().getTime(), []);

  useEffect(() => {
    const tipsRef = ref(db, `users/${username}/last-tip`);
    const unsubscribe = onValue(tipsRef, (snapshot) => {
      const data: DonationInfo | undefined = snapshot.val();
      console.log('Incoming tip:', data);

      // We want to prevent stale tips from triggering callback. That can happen on initial subscription
      if (data && data.createdAt > timestampFilter) callback(data);
    });

    return () => unsubscribe();
  }, [callback, db, timestampFilter, username]);
}
