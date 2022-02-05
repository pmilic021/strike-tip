import { createContext, FC, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getEditorAuth } from './firebase-setup';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getFirebase = () => {
  const app = initializeApp(config);
  return {
    app,
    auth: getAuth(app),
    db: getDatabase(app),
  };
};

export const firebaseApplication = getFirebase();

const FirebaseContext = createContext<Database>({} as Database);
export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseProvider: FC = ({ children }) => {
  const [db, setDb] = useState<Database>();

  useEffect(() => {
    // setAuth(firebaseApplication.auth);
    getEditorAuth(firebaseApplication.auth);
    setDb(firebaseApplication.db);
  }, []);

  return db ? (
    <FirebaseContext.Provider value={db}>{children}</FirebaseContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};
