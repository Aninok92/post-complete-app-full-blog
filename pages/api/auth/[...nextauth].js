import NextAuth from 'next-auth'
import { connectToDB } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions =({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }) {
          const newUser = {
            email: session.user.email 
          };
          
          session.user = newUser;
          
          return session;
        }
      },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                let client
                try {
                    client = await connectToDB()
                    const userCollection = client.db(process.env.mongodb_database).collection('users')

                    const user = await userCollection.findOne({email: credentials.email})

                    if(!user) {
                        throw new Error('No user found!')
                    }
                    const isValid = await verifyPassword(credentials.password, user.password)

                    if(!isValid) {
                        throw new Error('Could not log you in')
                    }
                    return { email: user.email }
                } catch (error) {
                    throw error
                } finally {
                    if (client) {
                        await client.close()
                    }
                }
            }
        })
    ]
})

export default NextAuth(authOptions)