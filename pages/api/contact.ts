import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Data, Message } from "../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, name, message }: Message = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    res.status(422).json({ message: "Invalid input." });
    return;
  }

  const newMessage: Message = { email, name, message };

  let client;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zuo7ept.mongodb.net/?retryWrites=true&w=majority`;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Couldnt connect to database" });
    return;
  }

  const db = client.db(process.env.mongodb_database);

  try {
    const result = await db.collection("messages").insertOne(newMessage);
    newMessage.id = result.insertedId;
  } catch (err) {
    client.close();
    res.status(500).json({ message: err.message || "Storing message failed" });
    return;
  }

  client.close();

  res
    .status(201)
    .json({ message: "Successfully stored message!", data: newMessage });
}
