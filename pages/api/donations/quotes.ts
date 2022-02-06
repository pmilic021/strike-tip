// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from 'lib/api';
import { InvoiceQuote, strikeClient, StrikeError } from 'lib/strike-api';

type Data = InvoiceQuote | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const payload: { invoiceId: string } = req.body;
    const response = await strikeClient.requestQuote(payload.invoiceId);

    res.status(201).json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof StrikeError) {
      res.status(e.data.status).json({ message: e.data.message });
    } else {
      res.status(500).json({ message: 'Error. Something went wrong' });
    }
  }
}
