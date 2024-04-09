import NextAuth, { Session } from "next-auth";
import { SessionStrategy } from "next-auth/next";
import { MongoClient } from "mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
  session: {
    strategy: "jwt" as SessionStrategy, // Ensure correct type for strategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: Session }): Promise<Session> {
      const newUser: { email: string } = {
        email: session.user.email,
      };

      session.user = newUser;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        let client: MongoClient | null = null;
        try {
          client = await connectToDB(); // Assuming connectToDB returns a MongoClient
          const userCollection = client
            .db(process.env.mongodb_database)
            .collection("users");

          const user = await userCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password, // Assuming user.password is of string type
          );

          if (!isValid) {
            throw new Error("Could not log you in");
          }

          return { email: user.email };
        } catch (error) {
          throw error;
        } finally {
          if (client) {
            await client.close();
          }
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
