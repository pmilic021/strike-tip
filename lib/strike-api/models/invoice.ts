import { CurrencyAmount } from './currency-amount';

export interface Invoice {
  invoiceId: string;
  amount: CurrencyAmount;
  state: 'UNPAID' | 'PENDING' | 'PAID' | 'CANCELLED';
  created: Date;
  correlationId: string;
  description: string;
  issuerId: string;
  receiverId: string;
  payerId: string;
}

export interface CreateInvoice {
  correlationId?: string;
  description?: string;
  amount: CurrencyAmount;
}
