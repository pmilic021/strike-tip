import { useSettingsContext } from '../lib/utils/settings';
import { useForm } from 'react-hook-form';
import { Donation } from '../lib/api';
import { useState } from 'react';

type FormData = Omit<Donation, 'receiver'>;

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
      await props.onSubmit({ ...values, receiver: settings.username });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Error. Please try again.';
      setError(message);
    }
  };

  return (
    <main>
      <h1>Donate to {settings.username}&apos;s campaign:</h1>
      <div>{JSON.stringify(settings)}</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Amount:{' '}
              <input
                type="number"
                step={0.01}
                {...register('amount', { required: true, min: 1 })}
                placeholder="Amount in USD"
              />
              {errors.amount?.type === 'required' && (
                <span>Amount is required</span>
              )}
              {errors.amount?.type === 'min' && (
                <span>Min amount is 1 USD</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Description:{' '}
              <input
                type="text"
                {...register('description', { required: true })}
                placeholder="Message for the recipient"
              />
              {errors.description?.type === 'required' && (
                <span>Description is required</span>
              )}
            </label>
          </div>
          <div>
            <label>
              Signature:{' '}
              <input
                type="text"
                {...register('signature')}
                placeholder="Your signature (optional)"
              />
            </label>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Donate
            </button>
          </div>
          {error && <div>{error}</div>}
        </form>
      </div>
    </main>
  );
};
