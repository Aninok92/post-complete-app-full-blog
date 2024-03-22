import NextAuth from 'next-auth'
import { connectToDB } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions =({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                console.log(credentials)
                let client
                try {
                    client = await connectToDB()
                    // console.log('client', client)
                    const userCollection = client.db(process.env.mongodb_database).collection('users')

                    const user = await userCollection.findOne({email: credentials.email})

                    if(!user) {
                        throw new Error('No user found!')
                    }
                    // console.log('user', user)
                    const isValid = await verifyPassword(credentials.password, user.password)

                    //console.log('isValid', isValid)

                    if(!isValid) {
                        throw new Error('Could not log you in')
                    }

                    //console.log('email', {email: user.email})

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