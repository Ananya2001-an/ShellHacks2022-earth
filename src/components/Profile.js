import React from 'react'
import { Container, Row, Col, Tab,Nav } from 'react-bootstrap'
import IssueForm from './IssueForm'
import RaisedIssues from './RaisedIssues'
import Chats from './Chats'
import Courses from './Courses'

export default function Profile() {
  return (
    <Container className='flex-column p-3' style={{background:"black",height:"95vh", 
    borderRadius:"1rem", color:"rgb(0, 211, 0)", overflow:"auto"}}>
    <h1 style={{fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"}}>
      Your Profile
    </h1>
    
    <Tab.Container defaultActiveKey="first">
    <Row>
      <Col sm={3}  style={{borderRight:"1px solid rgb(0,211,0)", height:"70vh"}}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item> 
            <Nav.Link eventKey="first">Your Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Issues you raised</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Create New Issue</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Courses</Nav.Link>
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
          <Tab.Pane className='overflow-auto' style={{height:"80vh"}} eventKey="third">
            <IssueForm/>
          </Tab.Pane>
          <Tab.Pane eventKey="fourth">
            <Courses/>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
    
  </Container>
  )
}
