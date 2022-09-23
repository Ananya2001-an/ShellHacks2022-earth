require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.get('/', (req,res)=>{
  res.send("Server up and running")
})
app.use(
  cors({
    origin: "https://earth-web.netlify.app",
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
        success_url: `https://earth-web.netlify.app/dashboard/success?courseName=${donate.get(req.body[0].id).courseName}&user=${req.body[0].userId}`,
        cancel_url: 'https://earth-web.netlify.app/dashboard/cancel',
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

const server = app.listen(process.env.PORT || 5000)

const io = require('socket.io')(server,{
    cors:{
        origin: 'https://earth-web.netlify.app'
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
