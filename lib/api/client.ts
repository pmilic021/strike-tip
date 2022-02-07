import { Donation } from './models/donation';
import { Invoice, InvoiceQuote } from '../strike-api';

const apiFetch = async <T>(
  path: string,
  params: Omit<RequestInit, 'body'> & { body?: RequestInit['body'] | Object }
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...params.headers,
  };
  const jsonBody = headers['Content-Type'] === 'application/json';

  const response = await fetch(path, {
    ...params,
    headers,
    body: jsonBody
      ? JSON.stringify(params.body)
      : (params.body as RequestInit['body']),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Unknown api error');
  }

  return responseData as T;
};

const createDonationInvoice = async (donation: Donation) =>
  apiFetch<Invoice>('/api/donations/invoices', {
    method: 'POST',
    body: donation,
  });

const createDonationQuote = async (invoiceId: string) =>
  apiFetch<InvoiceQuote>('/api/donations/quotes', {
    method: 'POST',
    body: { invoiceId },
  });

const getAccountProfile = async (username: string) =>
  apiFetch<InvoiceQuote>(`/api/users/${username}/profile`, {
    method: 'GET',
  });

export const apiClient = {
  createDonationInvoice,
  createDonationQuote,
  getAccountProfile,
};
