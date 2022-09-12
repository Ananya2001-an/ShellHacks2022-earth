const io = require('socket.io')(5000,{
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
