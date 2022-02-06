// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  EventType,
  strikeClient,
  verifyRequest,
  WebhookEvent,
} from 'lib/strike-api';
import getRawBody from 'raw-body';
import { ref, set } from 'firebase/database';
import { getDb, getEditorAuth } from '../../../lib/data/firebase-setup';

type Data = { message: string };

const WEBHOOK_SECRET = process.env.STRIKE_WEBHOOK_SECRET || '';

// Disable default body parser, so we can get the raw body which
// is needed to verify the signature
export const config = {
  api: {
    bodyParser: false,
  },
};

const handleInvoiceUpdated = async (invoiceId: string) => {
  console.log('handling invoice updated');
  const invoice = await strikeClient.getInvoice(invoiceId);
  const db = getDb();
  await getEditorAuth();
  await set(ref(db, `invoices/${invoiceId}`), {
    state: invoice.state,
  });
  console.log('handled invoice updated');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({ message: 'Invalid request' });
      return;
    }

    const rawBody = await getRawBody(req);
    req.body = rawBody;

    if (!(await verifyRequest(req, WEBHOOK_SECRET))) {
      res.status(401).json({ message: 'Invalid request' });
      return;
    }

    const event: WebhookEvent = JSON.parse(rawBody.toString());
    console.log('event: ', event);

    if (event.eventType === EventType.InvoiceCreated) {
      console.log('handling invoice created');
    } else if (event.eventType === EventType.InvoiceUpdated) {
      if (event.data.changes.includes('state')) {
        await handleInvoiceUpdated(event.data.entityId);
      }
    }

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error. Something went wrong.' });
  }
}
