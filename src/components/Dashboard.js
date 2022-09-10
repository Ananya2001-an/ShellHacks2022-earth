import {Nav, Button, Tab} from 'react-bootstrap';
import { SignOut} from "../firebase";
import { useUser } from "../contexts/UserProvider";
import Profile from './Profile';

export default function Dashboard() {
  const {photo} = useUser()
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

      <Tab.Content className='p-4' style={{width:"80%"}}>
        <Tab.Pane eventKey="open">
          dfdfdf
        </Tab.Pane>
        <Tab.Pane eventKey="closed">
          sdddsd
        </Tab.Pane>
        <Tab.Pane eventKey="profile">
          <Profile/>
        </Tab.Pane>
      </Tab.Content>
      </div>
    </Tab.Container>
  )
}
