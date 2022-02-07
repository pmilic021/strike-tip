import { useSettingsContext } from 'lib/utils/settings';
import { ErrorCode, Invoice, InvoiceQuote, StrikeError } from 'lib/strike-api';
import { useEffect, useState } from 'react';
import QR from 'qrcode.react';
import { apiClient } from 'lib/api';
import { useTimer } from 'react-timer-hook';
import { Timer } from './timer';
import { onValue, ref } from 'firebase/database';
import { useFirebaseContext } from 'lib/data/firebase-context';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
  const { seconds, minutes, hours, days, isRunning, restart } = useTimer({
    expiryTimestamp: expiry,
  });
  const expired = !isRunning;
  const toast = useToast();

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
    <Container centerContent>
      <Heading mb={8}>Donate to {settings.username}:</Heading>
      <Heading mb={8} size="md">
        Amount: {invoice.amount.amount} {invoice.amount.currency}
      </Heading>

      <Box opacity={expired ? 0.3 : 1}>
        <QR value={quote.lnInvoice} />
      </Box>

      <div>
        {!expired ? (
          <Text mt={4} fontWeight="bold" color="#DD6B20">
            Expires in{' '}
            <Timer
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </Text>
        ) : (
          <Alert status="warning" my={4}>
            <AlertIcon />
            Quote expired
          </Alert>
        )}
      </div>

      {expired ? (
        <Button
          colorScheme="teal"
          onClick={createNewQuote}
          disabled={quoteExtendingState.inProgress}
        >
          Generate new quote
        </Button>
      ) : null}

      {quoteExtendingState.error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <AlertDescription>{quoteExtendingState.error}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() =>
              setQuoteExtendingState((current) => ({
                inProgress: current.inProgress,
              }))
            }
          />
        </Alert>
      )}
      {!expired ? (
        <Box
          mt={8}
          maxWidth={300}
          background="black"
          display="flex"
          flexDir="row"
          alignItems="center"
          p={4}
        >
          <Text color="gray.300" isTruncated>
            {quote.lnInvoice}
          </Text>
          <CopyToClipboard
            text={quote.lnInvoice}
            onCopy={() => {
              toast({
                title: 'Copied to clipboard',
                status: 'success',
                duration: 3000,
              });
            }}
          >
            <CopyIcon color="gray.300" ml={1} cursor="pointer" />
          </CopyToClipboard>
        </Box>
      ) : null}
    </Container>
  );
};
