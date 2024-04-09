import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "../auth/[...nextauth]";
import { connectToDB } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { isValidPassword } from "../../../lib/validtion";
import { Data } from "../../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  if (!isValidPassword(oldPassword) || !isValidPassword(newPassword)) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long",
    });
    return;
  }
  let client;
  try {
    client = await connectToDB();

    const db = client.db(process.env.mongodb_database);

    const existingUser = await db
      .collection("users")
      .findOne({ email: userEmail });

    if (!existingUser) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const currentPassword = existingUser.password;

    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordAreEqual) {
      res
        .status(403)
        .json({ message: "Incorrect password. Please try again." });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await db.collection("users").updateOne(
      {
        email: userEmail,
      },
      { $set: { password: hashedPassword } },
    );

    res.status(201).json({ message: "Change the password!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
