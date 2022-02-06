// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Donation, ErrorResponse } from 'lib/api';
import { Currency, Invoice, strikeClient, StrikeError } from 'lib/strike-api';
import { getDb, getEditorAuth } from 'lib/data/firebase-setup';
import { ref, set } from 'firebase/database';

type Data = Invoice | ErrorResponse;

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

    const db = getDb();
    await getEditorAuth();
    await set(ref(db, `invoices/${response.invoiceId}`), {
      state: response.state,
    });

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
