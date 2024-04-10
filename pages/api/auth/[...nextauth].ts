import NextAuth, { Session, SessionStrategy } from "next-auth";
import { MongoClient } from "mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

interface User {
  id: string;
  email: string;
  password: string
}

export const authOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: Session }): Promise<Session> {
      const newUser = {
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
          client = await connectToDB();
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
            user.password
          );

          if (!isValid) {
            throw new Error("Could not log you in");
          }

          return user as unknown as User;
        } catch (error) {
          throw error;
        } finally {
          if (client) {
            await client.close();
          }
        }
      },
      credentials: undefined
    }),
  ],
};

export default NextAuth(authOptions);
