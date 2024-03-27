import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { connectToDB } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDB();

  const db = client.db(process.env.mongodb_database);

  const existingUser = await db
    .collection("users")
    .findOne({ email: userEmail });

  if (!existingUser) {
    res.status(401).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = existingUser.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await db.collection("users").updateOne(
    {
      email: userEmail,
    },
    { $set: { password: hashedPassword } },
  );

  client.close();
  res.status(201).json({ message: "Change the password!" });
}
