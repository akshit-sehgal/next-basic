import { MongoClient } from 'mongodb';


export const connectDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGO_DB_URI);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db('events');
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection,sort={}, filter = {}) => {
  const db = client.db('events');
  const result = await db.collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return result;
};