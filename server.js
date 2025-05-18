

const PORT = 8000
const express = require('express')
const app = express()
const uuid4 = require('uuid4')
const cors = require('cors')
const sdk = require('node-appwrite')
app.use(cors())
app.use(express.json())


const client = new sdk.Client()
     .setEndpoint('https://fra.cloud.appwrite.io/v1')
     .setProject('6829f8eb0018717f7c08')
     .setKey('standard_02ec2f6806883f62ccf2c29afb6120f9b1ba3276ecf69019a878bb19fc2aa646c31927bc8a8e6ba4d95216de408186cb852b9fc8f4d64d4c56027c17bf493593a64e28fffd6f42f3ef3eed666d7e83899311d7beb074892e9e2038a14f88e064c2e681018937e6505272a97a1f0c468f74bd4e75262a2f007c997547401e1c2b')

const messaging = new sdk.Messaging(client)
const users = new sdk.Users(client)

app.post('/register', async (req, res) => {
    try {
        const user = req.body
        const id = uuid4()

        const result = await users.create(
            id, //userId
            user.email, //email (optional)
            user.tel   //telephone (optional)
        )
        console.log(result)

        if(result) {
            await sendEmail(result)
            await sendSMS(result)
        }

    } catch (error) {
        console.error(error)
    }
} )

const sendEmail = async (result) => {
    const id = uuid4()
    const email = result.email
    const userId = result['$id']

    const message = await messaging.createEmail(
        id, //messageId 
        `Welcome! ${email}`, //subject
        'Thank you so much for signing up! We welcome you to our email community', //content
        [], //topics(optional)
        [userId], //users (optional)
    )
    console.log(message)
}

const sendSMS = async (result) => {
    const id = uuid4()
    const userId = result['$id']

    const message = await messaging.createSms(
        id,  //messageId
        'Thank you so much for signing up! We welcome you to our SMS community', //content
        [], //topics(optional)
        [userId], //users (optional)
    )
    console.log(message)
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
