import React from 'react'
import { Container, Row, Col, Tab,Nav } from 'react-bootstrap'
import {useUser} from '../contexts/UserProvider'
import IssueForm from './IssueForm'
import RaisedIssues from './RaisedIssues'
import Chats from './Chats'

export default function Profile() {
  const {username} = useUser()
  return (
    <Container className='flex-column p-3' style={{background:"white",height:"95vh", 
    borderRadius:"1rem", color:"lightblue", overflow:"auto"}}>
    <h1 style={{fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"}}>
      Your Profile
    </h1>
    
    <Tab.Container defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item> 
            <Nav.Link eventKey="first">Your Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Issues you raised</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Issues you supported</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Create New Issue</Nav.Link>
          </Nav.Item>
          <Nav.Item> 
            <Nav.Link eventKey="fifth">Edit your profile</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9} style={{paddingLeft:"30px"}}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Chats/>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <RaisedIssues/>
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            fdfd
          </Tab.Pane>
          <Tab.Pane className='overflow-auto' style={{height:"80vh", display:"flex",
          justifyContent:"center"}} eventKey="fourth">
            <IssueForm/>
          </Tab.Pane>
          <Tab.Pane eventKey="fifth">
            jhjk
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
    
  </Container>
  )
}
