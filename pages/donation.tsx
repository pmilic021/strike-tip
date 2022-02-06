import type { NextPage } from 'next';
import { useSettingsContext } from '../lib/utils/settings';
import { apiClient } from 'lib/api/client';
import { Donation } from '../lib/api';
import { useForm } from 'react-hook-form';

type FormData = Omit<Donation, 'receiver'>;

const Donation: NextPage = () => {
  const { settings } = useSettingsContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const donate = async (donation: FormData) => {
    console.log('donation: ', donation);
    const response = await apiClient.donate({
      ...donation,
      receiver: settings.username,
    });
    console.log('response: ', response);
  };

  return (
    <main>
      <h1>Donate to {settings.username}&apos;s campaign:</h1>
      <div>{JSON.stringify(settings)}</div>
      <div>
        <form onSubmit={handleSubmit(donate)}>
          <div>
            <label>
              Amount:{' '}
              <input
                type="number"
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
            <button type="submit">Donate</button>
          </div>
        </form>
      </div>
      {/*<section>*/}
      {/*  <button onClick={() => getPaymentStatus(settings.username)}>*/}
      {/*    ZZTip*/}
      {/*  </button>*/}
      {/*</section>*/}
    </main>
  );
};

const getPaymentStatus = async (username: string): Promise<void> => {
  await fetch(`/api/users/${username}/zztip`);
};

export default Donation;
