import type { NextPage } from 'next';
import { apiClient } from 'lib/api/client';
import { useCallback, useState } from 'react';
import { DonationForm } from 'components/donation-form';
import { DonationPayment } from '../components/donation-payment';
import { DonationSuccess } from '../components/donation-success';
import { Donation } from '../lib/api';
import { Invoice, InvoiceQuote } from '../lib/strike-api';
import Layout from '../components/layout';

type State =
  | {
      status: 'initial';
    }
  | {
      status: 'pending_payment';
      invoice: Invoice;
      quote: InvoiceQuote;
    }
  | {
      status: 'donated';
    };

const CampaignDonation: NextPage = () => {
  const [state, setState] = useState<State>({ status: 'initial' });

  const donate = async (donation: Donation) => {
    const invoice = await apiClient.createDonationInvoice(donation);
    console.log('invoice', invoice);
    const quote = await apiClient.createDonationQuote(invoice.invoiceId);
    setState({ status: 'pending_payment', invoice, quote });
  };

  const onPaid = useCallback(() => {
    setState({ status: 'donated' });
  }, []);

  return (
    <Layout>
      {state.status == 'initial' ? <DonationForm onSubmit={donate} /> : null}
      {state.status == 'pending_payment' ? (
        <DonationPayment
          invoice={state.invoice}
          quote={state.quote}
          onPaid={onPaid}
        />
      ) : null}
      {state.status == 'donated' ? (
        <DonationSuccess
          onDonateAgain={() => setState({ status: 'initial' })}
        />
      ) : null}
    </Layout>
  );
};

export default CampaignDonation;
