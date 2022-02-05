import { createContext, FC, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const FirebaseContext = createContext<Database>({} as Database);
export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseProvider: FC = ({children}) => {

  const [db, setDb] = useState<Database>();

  useEffect(() => {
    const database = getDb();

    setDb(database);
  }, []);

  return db ? <FirebaseContext.Provider value={db}>
    {children}
  </FirebaseContext.Provider> : <div>Loading...</div>;
};

export const getDb = () => {
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}
