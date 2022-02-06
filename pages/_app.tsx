// import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
// import styles from '../styles/Home.module.scss';
import Head from 'next/head';
import { SettingsProvider } from 'lib/utils/settings';
import { FirebaseProvider } from 'lib/data/firebase-context';
import createEmotionCache from 'styles/create-emotion-cache';
import theme from 'styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Stream Tip</title>
        <meta name="description" content="Stream tipping app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SettingsProvider>
          <FirebaseProvider>
            <Component {...pageProps} />
          </FirebaseProvider>
        </SettingsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
