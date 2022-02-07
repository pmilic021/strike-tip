import { useSettingsContext } from '../lib/utils/settings';
import { useForm } from 'react-hook-form';
import { Donation } from '../lib/api';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';

type FormData = {
  amount: string;
  message: string;
  signature?: string;
};

type Props = { onSubmit: (donation: Donation) => Promise<void> };

export const DonationForm = (props: Props) => {
  const { settings } = useSettingsContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: FormData) => {
    try {
      setError(null);
      await props.onSubmit({
        receiver: settings.username,
        amount: +(+values.amount).toFixed(2),
        description: values.message,
        signature: values.signature,
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Error. Please try again.';
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>Donate to {settings.username}&apos;s campaign:</Heading>
      <FormControl isInvalid={!!errors.amount} mb={4}>
        <FormLabel htmlFor="amount">Amount in $</FormLabel>
        <NumberInput precision={2}>
          <NumberInputField
            id="amount"
            placeholder="Amount"
            {...register('amount', { min: 1, required: true })}
          />
        </NumberInput>
        <FormErrorMessage>
          {errors.amount?.type == 'min' ? 'Min amount is $1.00' : null}
          {errors.amount?.type == 'required' ? 'Amount is required' : null}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.message} mb={4}>
        <FormLabel htmlFor="description">Message for the recipient</FormLabel>
        <Input
          id="description"
          placeholder="Message"
          {...register('message', {
            required: 'Message is required',
          })}
        />
        <FormErrorMessage>
          {errors.message && errors.message.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="signature">Your signature</FormLabel>
        <Input
          id="signature"
          placeholder="Signature"
          {...register('signature')}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Donate
      </Button>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setError(null)}
          />
        </Alert>
      )}
    </form>
  );
};
