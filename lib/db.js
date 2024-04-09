import { MongoClient } from "mongodb";

export async function connectToDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zuo7ept.mongodb.net/?retryWrites=true&w=majority`,
  );

  return client;
}
