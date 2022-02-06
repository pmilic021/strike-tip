// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EventType, verifyRequest, WebhookEvent } from 'lib/strike-api';

type Data =
  | {
      name: string;
    }
  | {
      message: string;
    };

const WEBHOOK_SECRET = process.env.STRIKE_WEBHOOK_SECRET || '';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('webhook triggered by: ', req.headers['user-agent']);
  console.log('req headers: ', req.headers);
  console.log('method: ', req.method);
  console.log('WEBHOOK_SECRET: ', WEBHOOK_SECRET);
  var x = verifyRequest(req, WEBHOOK_SECRET);
  console.log('request valid: ', x);
  if (req.method !== 'POST' || !x) {
    res.status(410).json({ message: 'Invalid request' });
    return;
  }

  const event: WebhookEvent = req.body;

  if (event.eventType === EventType.InvoiceCreated) {
    console.log('handling invoice created: ', event);
  } else if (event.eventType === EventType.InvoiceUpdated) {
    console.log('handling invoice updated: ', event);
  }

  res.status(204);
}
