import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import { SettingsProvider } from '../core/utils/settings';
import { FirebaseProvider } from '../core/data/firebase';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SettingsProvider>
      <FirebaseProvider>
        <div className={styles.container}>
          <Head>
            <title>Stream Tip</title>
            <meta name="description" content="Stream tipping widget"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>

          <Component {...pageProps} />
        </div>
      </FirebaseProvider>
    </SettingsProvider>
  )
}

export default MyApp
