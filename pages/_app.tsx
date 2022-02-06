// import '../styles/globals.scss';
import type { AppProps } from 'next/app';
// import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import { SettingsProvider } from '../lib/utils/settings';
import { FirebaseProvider } from '../lib/data/firebase-context';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Stream Tip</title>
        <meta name="description" content="Stream tipping widget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <SettingsProvider>
          <FirebaseProvider>
            <Component {...pageProps} />
          </FirebaseProvider>
        </SettingsProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
