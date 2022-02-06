import { useSettingsContext } from 'lib/utils/settings';
import { ErrorCode, Invoice, InvoiceQuote, StrikeError } from 'lib/strike-api';
import { useEffect, useState } from 'react';
import QR from 'qrcode.react';
import { apiClient } from 'lib/api';
import { useTimer } from 'react-timer-hook';
import { Timer } from './timer';
import { onValue, ref } from 'firebase/database';
import { useFirebaseContext } from 'lib/data/firebase-context';

type Props = {
  invoice: Invoice;
  quote: InvoiceQuote;
  onPaid: () => void;
};

type QuoteExtendingState = { inProgress: boolean; error?: string };

export const DonationPayment = (props: Props) => {
  const { invoice, onPaid } = props;
  const { settings } = useSettingsContext();
  const db = useFirebaseContext();
  const [quote, setQuote] = useState(props.quote);
  const [quoteExtendingState, setQuoteExtendingState] =
    useState<QuoteExtendingState>({ inProgress: false });
  const expiry = new Date(quote.expiration);
  const timer = useTimer({
    expiryTimestamp: expiry,
  });
  const { seconds, minutes, hours, days, isRunning, restart } = timer;

  useEffect(() => {
    const invoicesRef = ref(db, `invoices/${invoice.invoiceId}`);
    const unsubscribe = onValue(invoicesRef, (snapshot) => {
      const data: { state: Invoice['state'] } | undefined = snapshot.val();
      if (data?.state == 'PAID') {
        onPaid();
      }
    });

    return () => unsubscribe();
  }, [db, onPaid, invoice.invoiceId]);

  const createNewQuote = async () => {
    try {
      if (quoteExtendingState.inProgress) {
        return;
      }
      setQuoteExtendingState({ inProgress: true });
      const quote = await apiClient.createDonationQuote(invoice.invoiceId);
      setQuote(quote);
      restart(new Date(quote.expiration));
      setQuoteExtendingState({ inProgress: false });
    } catch (e) {
      if (
        e instanceof StrikeError &&
        e.data.code === ErrorCode.InvalidStateForInvoicePaid
      ) {
        onPaid();
      } else {
        setQuoteExtendingState({
          inProgress: true,
          error: 'Error. Failed to create a new quote. Please try again.',
        });
        console.error(e);
      }
    }
  };

  return (
    <main>
      <h1>Payment to {settings.username}</h1>
      <br />
      <p>
        Amount: {invoice.amount.amount} {invoice.amount.currency}
      </p>
      <br />
      <QR value={quote.lnInvoice} />
      <br />
      {quote.lnInvoice}
      <div>
        {isRunning ? (
          <>
            Quote expires in{' '}
            <Timer
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </>
        ) : (
          'Quote expired'
        )}
      </div>
      {!isRunning ? (
        <button
          onClick={createNewQuote}
          disabled={quoteExtendingState.inProgress}
        >
          Generate new quote
        </button>
      ) : null}
      {quoteExtendingState.error ? (
        <div>{quoteExtendingState.error}</div>
      ) : null}
    </main>
  );
};
