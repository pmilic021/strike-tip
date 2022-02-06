import { NextApiRequest } from 'next';
import crypto from 'crypto';

const SIGNATURE_HEADER_NAME = 'x-webhook-signature';

const computeHmac = (content: Buffer, secret: string) => {
  const hmac = crypto.createHmac('sha256', secret);
  return hmac.update(content).digest('hex');
};

const getSignature = (request: NextApiRequest): string => {
  const requestSignature = request.headers[SIGNATURE_HEADER_NAME];
  return typeof requestSignature === 'string'
    ? requestSignature.toLowerCase()
    : '';
};

export const verifyRequest = async (
  request: NextApiRequest,
  secret: string
) => {
  try {
    const requestSignature = getSignature(request);
    const requestSignatureBuffer = Buffer.from(requestSignature, 'utf8');

    const contentSignature = computeHmac(request.body, secret);
    const contentSignatureBuffer = Buffer.from(contentSignature, 'utf8');

    return crypto.timingSafeEqual(
      requestSignatureBuffer,
      contentSignatureBuffer
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};
