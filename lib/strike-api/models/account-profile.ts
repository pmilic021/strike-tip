import { Currency } from './currency';

export interface AccountProfile {
  handle: string;
  avatarUrl: string;
  description: string;
  canReceive: boolean;
  currencies: {
    currency: Currency;
    isDefaultCurrency: boolean;
    isAvailable: boolean;
  }[];
}
