import {Nav, Button, Tab, Card, Modal, Badge} from 'react-bootstrap';
import { SignOut} from "../firebase";
import { useUser } from "../contexts/UserProvider";
import Profile from './Profile';
import { useIssue } from '../contexts/IssuesProvider';
import { useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc
} from "firebase/firestore";

export default function Dashboard() {
  const {photo, id, username} = useUser()
  const [show, setShow] = useState(false)
  const issues = useIssue()
  const [issue, setIssue] = useState(null)
  const convsCollectionRef = collection(db, "convs");

  function seeIssue(issue){
    setShow(true)
    setIssue(issue)
  }
  function closeModal(){
    setShow(false)
  }

  const createConversation = async(cid, cname, cphoto)=>{
    await addDoc(convsCollectionRef, { userId: id,username: username,userPhoto: photo,
    contactId:cid,contactName: cname, contactPhoto: cphoto, messages: []});
    alert('Conversation added successfully!')
  }

  return (
    <Tab.Container defaultActiveKey='open'>
      <div className='d-flex'>
      <Nav className='d-flex flex-column px-0' style={{width:"20%",height:"100vh"
      , background:"white"
      ,padding:"10px",alignItems:"center", justifyContent:"space-between"}}>
      
      <Nav.Item style={{color:"lightblue",fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      fontSize:"27px"}}>Earth</Nav.Item>
      
      <Nav className='flex-column align-items-center w-100'>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='profile'><img style={{width:"50px",height:"50px"
        ,border:"3px solid lightblue", borderRadius:"1.5rem"}}
         src={photo}/></Nav.Link>
      </Nav.Item>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='open'>Open Issues</Nav.Link>
      </Nav.Item>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='closed'>Closed Issues</Nav.Link>
      </Nav.Item>
      </Nav>

      <Nav.Item>
      <Button variant='light' style={{color:"white"}} onClick={SignOut}>Sign Out</Button>
      </Nav.Item>
      </Nav>

      <Tab.Content className='p-3' style={{width:"80%"}}>
        <Tab.Pane className='overflow-auto' style={{height:"90vh"}} eventKey="open">
          { issues !== '' &&
            issues.map(i=>{
              return <><Card>
              <Card.Header>Issue title: {i.title},
              Contributers: <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src={i.userPhoto}/></Card.Header>
              <Card.Body>{i.desc.substring(0,30)} <Button className='p-0' style={{color:"lightblue"}} variant='link' onClick={()=>seeIssue(i)}>...read more</Button></Card.Body>
            </Card><br/></>
            })
          }
        </Tab.Pane>
        <Tab.Pane eventKey="closed">
          sdddsd
        </Tab.Pane>
        <Tab.Pane eventKey="profile">
          <Profile/>
        </Tab.Pane>
      </Tab.Content>
      </div>
      <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton><span style={{fontWeight:"bold"}}>Issue: </span>{issue !== null && issue.title}</Modal.Header>
      <Modal.Body className='d-flex flex-column'>
      <span style={{fontWeight:"bold"}}>Raised by:</span> 
      <p>{issue !== null && issue.username}</p>
      <span style={{fontWeight:"bold"}}>Description:</span>
      <p>{issue !== null && issue.desc}</p>
      {/* {
        issue !== null && issue.donate !== '' && <Button>Donate</Button>
      } */}
      <span style={{fontWeight:"bold"}}>Contributors:</span>
      <div>
      <img style={{width:"40px", height:"40px", borderRadius:"50%"}} src={issue !== null && issue.userPhoto}/>
      </div>
      <span style={{fontWeight:"bold"}}>Associated Tags:</span>
      <div className='flex mb-4'>
      {
        issue !== null && issue.tags.split(',').map(tag=>{
          return <Badge pill bg='secondary'>{tag}</Badge>
        })
      }
      </div>
      <Button onClick={()=>createConversation(issue.userId, issue.username, issue.userPhoto)}>Start conversation with {issue !== null && issue.username}</Button>
      </Modal.Body>
      </Modal>
    </Tab.Container>
  )
}
