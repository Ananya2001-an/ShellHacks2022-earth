import { Button, Card, Modal, Badge} from 'react-bootstrap';
import { useState } from 'react';
import { db } from '../firebase';
import { useUser } from "../contexts/UserProvider";
import {
  collection,
  addDoc
} from "firebase/firestore";

export default function ViewIssues({issues, state}) {
    let badgeColors = ['primary', 'secondary','warning','danger','success', 'info', 'dark']
    const [issue, setIssue] = useState(null)
    const [show, setShow] = useState(false)
    const convsCollectionRef = collection(db, "convs");
    const {photo, id, username} = useUser()

    function seeIssue(issue){
    setShow(true)
    setIssue(issue)
    }
    function closeModal(){
    setShow(false)
    }
    const createConversation = async(cid, cname, cphoto, issueId)=>{
        await addDoc(convsCollectionRef, { userId: id,username: username,userPhoto: photo,
        contactId:cid,contactName: cname, contactPhoto: cphoto, messages: [], issue: issueId});
        alert('Conversation added successfully!')
    }
  return (
    issues !== '' &&
    issues.map(i=>{
    if(i.isOpen === true && state === "open" || i.isOpen === false && state === "closed")
    {return <>
    <Card>
    <Card.Header><span style={{fontWeight:"bold"}}>Issue title:</span> {i.title},
    <span style={{fontWeight:"bold"}}>  Tags:  </span>
    {
      i.tags.split(',').map(tag=>{
        return <Badge className='mx-1' pill 
        bg={badgeColors[Math.floor(Math.random()*badgeColors.length)]}>{tag}</Badge>
      })
    }
    </Card.Header>
    <Card.Body>{i.desc.substring(0,120)} <Button className='p-0' style={{color:"lightblue"}} variant='link' onClick={()=>seeIssue(i)}>...read more</Button></Card.Body>
    </Card><br/>
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton><span style={{fontWeight:"bold"}}>Issue: </span>{issue !== null && issue.title}</Modal.Header>
      <Modal.Body className='d-flex flex-column'>
      <span style={{fontWeight:"bold"}}>Raised by:</span> 
      <p>{issue !== null && issue.username}</p>
      <span style={{fontWeight:"bold"}}>Description:</span>
      <p>{issue !== null && issue.desc}</p>
      <span style={{fontWeight:"bold"}}>Contributors:</span>
      <div>
      {/* { 
        i.involved !== undefined &&
        i.involved.map(p=>{
          return <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src={p}/>
        })
      } */}
      <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src={issue !== null && issue.userPhoto}/>
      </div>
      <span style={{fontWeight:"bold"}}>Associated Tags:</span>
      <div className='flex mb-4'>
      {
        issue !== null && issue.tags.split(',').map(tag=>{
          return <Badge className='mx-1' pill bg={badgeColors[Math.floor(Math.random()*badgeColors.length)]}>{tag}</Badge>
        })
      }
      </div>
      <Button variant='dark' onClick={()=>createConversation(issue.userId, issue.username, issue.userPhoto, issue.docId)}>Start conversation with {issue !== null && issue.username}</Button>
      </Modal.Body>
      </Modal>
    </>}
    })
  )
}
