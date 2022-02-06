import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbCollection } from '../../../../lib/data/mongo-db';
import { DonationInfo } from '../../../../lib/data/models';

type Data = { message: string } | DonationInfo[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('tips api. req query:');
  console.log(req.query);

  const username = req.query.username as string;
  const tipsAfterTimestamp = req.query.tipsAfter
    ? +req.query.tipsAfter
    : undefined;

  const users = await getDbCollection<any>('users');
  const user = await users.findOne({ username: username });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const result = !!tipsAfterTimestamp
    ? user.tips.filter((tip: any) => tip.createdAt > tipsAfterTimestamp)
    : user.tips;

  res.status(200).json(result);
}
