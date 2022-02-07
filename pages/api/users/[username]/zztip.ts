import type { NextApiRequest, NextApiResponse } from 'next';
import { DonationInfo } from '../../../../lib/data/models';
import { ref, set } from 'firebase/database';
import crypto from 'crypto';
import { getEditorAuth, getDb } from '../../../../lib/data/firebase-setup';

type Data = { message: string } | DonationInfo[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getEditorAuth();
  const db = getDb();

  console.log('zztips api. req query:');
  console.log(req.query);

  const username = req.query.username as string;

  const tip: DonationInfo = {
    id: crypto.randomUUID(),
    createdAt: new Date().getTime(),
    amount: 1,
    message: 'hello',
    donor: 'MrJack',
  };

  await set(ref(db, 'latest-tip/' + username), tip);

  res.status(201).json({ message: 'created' });
}
