import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { Settings, useSettingsContext } from '../lib/utils/settings';
import Link from 'next/link';

const Home: NextPage = () => {
  const { setSettings, settingsQueryParam } = useSettingsContext();

  const changeHandler = (key: keyof Settings, value: any) => {
    console.log('QWEQWE');
    setSettings((state) => ({ ...state, [key]: value }));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Stream Tip</h1>

      <div>
        <input
          placeholder="Username"
          required
          onChange={(x) => changeHandler('username', x.target.value)}
        />
        <input
          placeholder="Goal Amount"
          type="number"
          onChange={(x) => changeHandler('goalAmount', x.target.value)}
        />
        <input
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
