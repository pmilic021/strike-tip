import { NextApiRequest } from 'next';
import crypto from 'crypto';

const SIGNATURE_HEADER_NAME = 'x-webhook-signature';

const computeHmac = (content: any, secret: string) => {
  const hmac = crypto.createHmac('sha256', secret);

  return hmac.update(content).digest('hex');
};

const getSignature = (request: NextApiRequest): string | null => {
  const requestSignature = request.headers[SIGNATURE_HEADER_NAME];
  return typeof requestSignature === 'string' ? requestSignature : null;
};

const getRawBody = (body: unknown) => {
  const byteArray = [];
  const str = JSON.stringify(body);
  const buffer = new Buffer(str, 'utf8');

  for (let i = 0; i < buffer.length; i++) {
    byteArray.push(buffer[i]);
  }

  return byteArray;
};

export const verifyRequest = (request: NextApiRequest, secret: string) => {
  const requestSignature = getSignature(request);
  console.log('requestSignature: ', requestSignature);
  if (!requestSignature) {
    return false;
  }
  const requestSignatureBuffer = Buffer.from(requestSignature, 'utf8');

  const contentSignature = computeHmac(getRawBody(request.body), secret);
  console.log('contentSignature: ', contentSignature);

  const contentSignatureBuffer = Buffer.from(contentSignature, 'utf8');

  return crypto.timingSafeEqual(requestSignatureBuffer, contentSignatureBuffer);
};
