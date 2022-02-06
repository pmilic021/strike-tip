// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EventType, verifyRequest, WebhookEvent } from 'lib/strike-api';
import getRawBody from 'raw-body';

type Data = { message: string };

const WEBHOOK_SECRET = process.env.STRIKE_WEBHOOK_SECRET || '';

// Disable default body parser, so we can get the raw body which
// is needed to verify the signature
export const config = {
  api: {
    bodyParser: false,
  },
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
      console.log('handling invoice updated');
    }

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error. Something went wrong.' });
  }
}
