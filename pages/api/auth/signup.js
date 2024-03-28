import { hashPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long",
      });
      return;
    }

    const client = await connectToDB();

    const db = client.db(process.env.mongodb_database);

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exist already" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}
