import {Nav, Button} from 'react-bootstrap';
import { SignOut} from "../firebase";
import { useUser } from "../contexts/UserProvider";
import { Outlet } from 'react-router-dom'

export default function Navbar() {
  const {photo} = useUser()
  return (
  <>
  <Nav style={{display:"flex",borderBottom:"3px solid white"
    ,padding:"10px",alignItems:"center", justifyContent:"space-between"}}>
    <Nav.Item style={{color:"white",fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontSize:"32px"}}>Little<span>Artist</span></Nav.Item>
    
    <Nav.Item className='d-flex align-items-center'>
    <img style={{width:"50px",height:"50px",marginRight:"20px",border:"3px solid white", borderRadius:"1.5rem"}} src={photo}/>
  
    <Button variant='dark' onClick={SignOut}>Sign Out</Button>
    </Nav.Item>
    </Nav>
  <Outlet/>
  </>
    
  )
}
