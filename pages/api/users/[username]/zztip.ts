import type { NextApiRequest, NextApiResponse } from 'next'
import { TipInfo } from '../../../../lib/data/models';
import { getDb } from '../../../../lib/data/firebase';
import { ref, push, set } from 'firebase/database';
import crypto from 'crypto';

type Data = { message: string } | TipInfo[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = getDb();

  console.log('zztips api. req query:');
  console.log(req.query);

  const username = req.query.username as string;

  const tip: TipInfo = {
    id: crypto.randomUUID(),
    createdAt: new Date().getTime(),
    amount: '1 usd',
    message: 'hello'
  };

  // TODO: think if we need to store all tips or we can just store last tip
  await push(ref(db, 'users/' + username + '/tips'), tip);
  await set(ref(db, 'users/' + username + '/last-tip'), tip);

  res.status(201).json({message: 'created'});
}
