import { CreateInvoice, Invoice, InvoiceQuote } from './models/invoice';
import { ErrorResponse } from './models/error';
import { PageResults, RequestParams } from './models/pagination';

const baseUrl = process.env.STRIKE_API_URL;
const strikeApiKey = process.env.STRIKE_API_KEY;

export class StrikeError extends Error {
  traceId: ErrorResponse['traceId'];
  data: ErrorResponse['data'];
  debug: ErrorResponse['debug'];

  constructor(error: ErrorResponse) {
    super('Strike Api error');
    this.data = error.data;
  }
}

const strikeFetch = async <T>(
  path: string,
  params: Omit<RequestInit, 'body'> & { body?: RequestInit['body'] | Object }
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${strikeApiKey}`,
    ...params.headers,
  };
  const jsonBody = headers['Content-Type'] === 'application/json';

  const response = await fetch(`${baseUrl}/${path}`, {
    ...params,
    headers,
    body: jsonBody
      ? JSON.stringify(params.body)
      : (params.body as RequestInit['body']),
  });

  if (
    !response.ok &&
    !response.headers.get('Content-Type')?.includes('application/json')
  ) {
    throw new Error(response.statusText);
  }

  const responseData = await response.json();

  if (!response.ok) {
    throw new StrikeError(responseData as ErrorResponse);
  }

  return responseData as T;
};

const toQueryParams = (params: RequestParams): string => {
  return Object.keys(params)
    .map((key) => `$${key}=${params[key as keyof RequestParams]}`)
    .join('&');
};

const getInvoices = (params: RequestParams): Promise<PageResults<Invoice>> => {
  const queryParams = toQueryParams(params);
  return strikeFetch<PageResults<Invoice>>(`v1/invoices?${queryParams}`, {
    method: 'GET',
  });
};

const getInvoice = (invoiceId: string): Promise<Invoice> => {
  return strikeFetch<Invoice>(`v1/invoices/${invoiceId}`, {
    method: 'GET',
  });
};

const createInvoice = (request: CreateInvoice): Promise<Invoice> =>
  strikeFetch<Invoice>('v1/invoices', { method: 'POST', body: request });

const createInvoiceForReceiver = (
  receiversAccountHandle: string,
  request: CreateInvoice
): Promise<Invoice> =>
  strikeFetch<Invoice>(`v1/invoices/handle/${receiversAccountHandle}`, {
    method: 'POST',
    body: request,
  });

const requestQuote = (invoiceId: string): Promise<InvoiceQuote> =>
  strikeFetch<InvoiceQuote>(`v1/invoices/${invoiceId}/quote`, {
    method: 'POST',
  });

export const strikeClient = {
  getInvoices,
  getInvoice,
  createInvoice,
  createInvoiceForReceiver,
  requestQuote,
};
