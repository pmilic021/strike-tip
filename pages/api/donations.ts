// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Donation, ErrorResponse } from 'lib/api';
import { Currency, strikeClient, StrikeError } from '../../lib/strike-api';

type Data =
  | {
      message: string;
    }
  | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const payload: Donation = req.body;
    const description = {
      message: payload.description,
      signature: payload.signature,
    };
    const response = await strikeClient.createInvoiceForReceiver(
      payload.receiver,
      {
        amount: { amount: payload.amount.toString(), currency: Currency.Usd },
        description: JSON.stringify(description),
      }
    );
    res.status(201).json({ message: 'Invoice created' });
  } catch (e) {
    console.error(e);
    if (e instanceof StrikeError) {
      res.status(e.data.status).json({ message: e.data.message });
    } else {
      res.status(500).json({ message: 'Error. Something went wrong' });
    }
  }
}
