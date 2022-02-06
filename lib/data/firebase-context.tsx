import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Database } from 'firebase/database';
import { getDb } from './firebase-setup';

const FirebaseContext = createContext<Database>({} as Database);
export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseProvider: FC = ({ children }) => {
  const [db, setDb] = useState<Database>();

  useEffect(() => {
    const database = getDb();

    setDb(database);
  }, []);

  return db ? (
    <FirebaseContext.Provider value={db}>{children}</FirebaseContext.Provider>
  ) : null;
};
