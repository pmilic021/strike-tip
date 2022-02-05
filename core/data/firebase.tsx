import { createContext, FC, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';

// TODO: this rtdb is unsecured! lock it down in the dashboard
const firebaseConfig = {
  apiKey: 'AIzaSyCuTiA9EgY3MMc1uEUsfMxzr0xkSPoepbs',
  authDomain: 'strike-tip.firebaseapp.com',
  databaseURL: 'https://strike-tip-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'strike-tip',
  storageBucket: 'strike-tip.appspot.com',
  messagingSenderId: '605074407918',
  appId: '1:605074407918:web:3da95a7f40ac86434c0eff',
  measurementId: 'G-TN811RRB3W'
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
