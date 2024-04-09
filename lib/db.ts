import { MongoClient } from "mongodb";

import { MongoUriComponents } from "../types/types";

export async function connectToDB(): Promise<MongoClient> {
  const uriComponents: MongoUriComponents = {
    username: process.env.mongodb_username!,
    password: process.env.mongodb_password!,
    clustername: process.env.mongodb_clustername!,
  };

  const uri = `mongodb+srv://${uriComponents.username}:${uriComponents.password}@${uriComponents.clustername}.zuo7ept.mongodb.net/?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(uri);

  return client;
}
