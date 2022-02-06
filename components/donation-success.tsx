import { useSettingsContext } from '../lib/utils/settings';

type Props = { onDonateAgain: () => void };

export const DonationSuccess = ({ onDonateAgain }: Props) => {
  const { settings } = useSettingsContext();

  return (
    <main>
      <h1>Successfully donated to {settings.username}!</h1>
      <div>
        <button onClick={onDonateAgain}>Donate again</button>
      </div>
    </main>
  );
};
