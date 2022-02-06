import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let appCache: FirebaseApp;

const getApp = () => {
  if (!appCache) {
    appCache = initializeApp(firebaseConfig);
  }

  return appCache;
};

export const getDb = () => {
  const app = getApp();
  return getDatabase(app);
};

export const getEditorAuth = async () =>
  await signInWithEmailAndPassword(
    getAuth(getApp()),
    process.env.FIREBASE_EDITOR_USER_NAME!,
    process.env.FIREBASE_EDITOR_USER_PASS!
  );
