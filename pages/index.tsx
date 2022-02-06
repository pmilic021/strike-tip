import type { NextPage } from 'next';
// import styles from '../styles/Home.module.scss';
import { Settings, useSettingsContext } from '../lib/utils/settings';
import Link from 'next/link';
import { Input } from '@mui/material';

const Home: NextPage = () => {
  const { setSettings, settingsQueryParam } = useSettingsContext();

  const changeHandler = (key: keyof Settings, value: any) => {
    console.log('QWEQWE');
    setSettings((state) => ({ ...state, [key]: value }));
  };

  return (
    <main>
      <h1>Welcome to Stream Tip</h1>

      <div>
        <Input
          placeholder="Username"
          required
          onChange={(x) => changeHandler('username', x.target.value)}
        />
        <Input
          placeholder="Goal Amount"
          type="number"
          onChange={(x) => changeHandler('goalAmount', x.target.value)}
        />
        <Input
          placeholder="Goal Description"
          onChange={(x) => changeHandler('goalDescription', x.target.value)}
        />

        <Link
          href={{
            pathname: '/campaign-settings',
            query: settingsQueryParam,
          }}
        >
          Start
        </Link>
      </div>
    </main>
  );
};

export default Home;
