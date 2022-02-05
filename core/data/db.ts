import { MongoClient } from 'mongodb';
import { Document } from 'bson';

export const getDb = async () => {
  const connectionString =
    'mongodb+srv://admin:4MXorFT8WIjyGs3N@stream-tip.0szne.mongodb.net/tips?retryWrites=true&w=majority'
  const client = await MongoClient.connect(connectionString);
  console.log('connected to db');

  return client.db();
};

export const getDbCollection = async <TSchema extends Document = Document>(
  collectionName: string
) => {
  const db = await getDb();
  return db.collection<TSchema>(collectionName);
};
