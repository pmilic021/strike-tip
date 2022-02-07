// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorCode, strikeClient, StrikeError } from 'lib/strike-api';
import { AccountProfile } from 'lib/strike-api/models/account-profile';
import { ErrorResponse } from 'lib/api';

type Data = AccountProfile | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (typeof req.query.username !== 'string') {
      res.status(404).json({ message: 'Account not found.' });
      return;
    }
    const username = req.query.username;
    const response = await strikeClient.getAccountProfileByHandle(username);

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof StrikeError) {
      if (e.data.code === ErrorCode.NotFound) {
        res.status(404).json({ message: 'Account not found.' });
      } else {
        res.status(e.data.status).json({ message: e.data.message });
      }
    } else {
      res.status(500).json({ message: 'Error. Something went wrong' });
    }
  }
}
