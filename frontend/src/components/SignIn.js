import { SignInWithGoogle } from "../firebase";
import {Button} from 'react-bootstrap'

export default function SignIn() {
  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center'
    style={{padding:"20px", height:"100vh"}}>
    <h1 style={{fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontSize:"100px"}}>Earth</h1>
    <Button variant='dark' style={{color:"rgb(0, 211, 0)"}} onClick={SignInWithGoogle}>Sign in with Google</Button>
    </div>
    </>
    
  )
}
