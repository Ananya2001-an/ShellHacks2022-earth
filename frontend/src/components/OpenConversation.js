import React, {useRef, useCallback, useEffect, useState} from 'react'
import {Button, Form, InputGroup} from 'react-bootstrap'
import { useConv } from '../contexts/ConversationProvider'
import { useUser } from '../contexts/UserProvider'
import { updateDoc, doc, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useSocket } from '../contexts/SocketProvider'

export default function OpenConversation() {
    const {selectedConversation, convs} = useConv()
    const messageRef = useRef()
    const {id, username} = useUser()
    const socket = useSocket()

    const addMessageToConversation = useCallback(({recipient, msg, issueId, issueName})=>{
      let madeChange = false
      convs.map(async prev=>{
        
          if(prev.contactName === recipient[0].name)
          {
            madeChange = true
            const conv = doc(db, "convs", prev.docId)
            let messages = []
            prev.messages.map(m=>{
              messages.push(m)
            })
            messages.push({msg: msg,
              fromName: recipient[0].name, fromId: recipient[0].id})
            const newFields = { messages: messages };
            await updateDoc(conv, newFields);
              
          }
         
      })

      if(madeChange === false){
        const createConversation = async(recipient, msg, issueId, issueName)=>{
          const convsCollectionRef = collection(db, "convs")
          await addDoc(convsCollectionRef, { userId: id,username: username, contactId:recipient[0].id ,
          contactName: recipient[0].name, contactPhoto: recipient[0].photo, messages: [{msg: msg,
          fromName: recipient[0].name, fromId: recipient[0].id}], issueId: issueId, issueName: issueName});
        }

        createConversation(recipient, msg, issueId, issueName)

      }
  })

    useEffect(() => {
      if(socket == null) return
        
      socket.on('receive-message', addMessageToConversation)

      return () => socket.off('receive-message') 
    }, [socket, addMessageToConversation])

  
    const updateConv = async (e) => {
      e.preventDefault()
        const conv = doc(db, "convs", selectedConversation.docId)
        let messages = []
        selectedConversation.messages.map(m=>{
          messages.push(m)
        })
        messages.push({msg: messageRef.current.value,
          fromName: username, fromId: id})
        const newFields = { messages: messages };
        await updateDoc(conv, newFields);
        socket.emit('send-message', 
        {recipient: {id: selectedConversation.contactId} 
        , msg: messageRef.current.value, senderName: username, senderPhoto: selectedConversation.userPhoto,
        issueId: selectedConversation.issueId ,issueName: selectedConversation.issueName})
        messageRef.current.value = ''
    }

    return (
      <div style={{display:"flex", flexDirection:"column", height:"70vh", border:"1px solid rgb(0, 211, 0)"}}>
      <div style={{flexGrow:1, overflow:"auto", background:"black"}}>
        <div className='d-flex flex-column align-items-start justify-content-end px-3'>
        {//messages
          selectedConversation != undefined && selectedConversation.userId === id
          && (
            selectedConversation.messages.map((msg)=> {
              // const lastmessage = selectedConversation.messages.length - 1 === index
              
              return <div className={`my-1 d-flex flex-column
                ${msg.fromId === id ? 'align-self-end align-items-end': 'align-items-start'}`}>
                  <div className = {`rounded px-2 py-1`}
                  style={msg.fromId === id ? {background:"rgb(0, 211, 0)", color:"black"} :
                  {background:"none", color:"rgb(0, 211, 0)", border:"1px solid rgb(0, 211, 0)"}}>
                  {msg.msg}</div>
                  
                  <div className={`small`} style={{color:"rgb(0, 211, 0)"}}>
                  {msg.fromId === id ? 'You': `${msg.fromName}`}
                  </div>
              </div>
            })
          )
        }
        
        </div>
       
      </div>
      <Form onSubmit={updateConv}>
          <InputGroup>
          <Form.Control ref={messageRef} style={{background:"none",border:"1px solid rgb(0, 211, 0)",
          borderLeft:"0", borderRight:"0", borderBottom:"0", color:"rgb(0, 211, 0)"}}
          className='rounded-0'></Form.Control>
          <Button type="submit" variant='dark' className='rounded-0'>Send</Button>
          </InputGroup>
      </Form>
      </div>
    )
}
