import type { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";
import { isValidEmail, isValidPassword } from "../../../lib/validtion";
import { Data } from "../../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    let client;
    try {
      const data = req.body;

      const { email, password } = data;

      if (!isValidEmail(email) || !isValidPassword(password)) {
        res.status(422).json({
          message:
            "Invalid input - password should also be at least 7 characters long",
        });
        return;
      }

      client = await connectToDB();

      const db = client.db(process.env.mongodb_database);

      const existingUser = await db
        .collection("users")
        .findOne({ email: email });

      if (existingUser) {
        res.status(422).json({ message: "User exist already" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const result = await db.collection("users").insertOne({
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
