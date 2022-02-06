import { Donation } from './models/donation';

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

const donate = async (donation: Donation) => {
  await apiFetch(`/api/donations`, {
    method: 'POST',
    body: donation,
  });
};

export const apiClient = {
  donate,
};
