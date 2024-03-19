import { MongoClient } from 'mongodb'

const PASSWORD = 'k7qH3VAqsw1jJgzB'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    if (req.method === 'POST') {
        const { email, name, message } = req.body
  

    if(
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !message ||
        message.trim() === ''
    ) {
        res.status(422).json({ message: 'Invalid input.'})
        return
    }

    const newMessage = { email, name, message }

    let client

   try {
    client = await MongoClient.connect(`mongodb+srv://aninok92:${PASSWORD}@cluster0.zuo7ept.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
   } catch(err) {
    res.status(500).json({ message: err.message || 'Couldnt connect to database'})
    return
   }

   const db = client.db('my-site')

   try {
    const result = await db.collection('messages').insertOne(newMessage)
    newMessage.id = result.insertedId
   } catch(err) {
    client.close()
    res.status(500).json({ message: err.message || 'Storing message failed' })
    return
   }

   client.close()

   res.status(201).json({ message: 'Successfully stored message!', data: newMessage })
}
}