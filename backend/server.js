require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const donate = new Map([
    [1, {courseName:"Let's explore the sea creatures", coursePriceInCents: 12000}],
    [2, {courseName:"Let's explore life in the desert!", coursePriceInCents: 10000}],
    [3, {courseName:"The world of ice and who else?", coursePriceInCents: 8000}]
])

app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.map(course=>{
            const courseInfo = donate.get(course.id)
            return{
                price_data:{
                    currency: 'usd',
                    product_data:
                    {
                        name: courseInfo.courseName
                    },
                    unit_amount: courseInfo.coursePriceInCents
                },
                quantity: 1,
            }
        }),
        success_url: 'http://localhost:3000/dashboard',
        cancel_url: 'http://localhost:3000/dashboard',
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

const server = app.listen(5000)

const io = require('socket.io')(server,{
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on('connection', socket=>{
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipient, msg, senderName, senderPhoto, issueId, issueName}) =>{
            const newRecipient = []
            newRecipient.push({name: senderName, id: id, photo: senderPhoto})
            socket.to(recipient.id).emit('receive-message', {
                recipient: newRecipient, msg, issueId, issueName
            })
        })
})
