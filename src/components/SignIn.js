import { SignInWithGoogle } from "../firebase";
import {Button} from 'react-bootstrap'

export default function SignIn() {
  return (
    <>
    <div className='d-flex flex-column align-items-center justify-content-center'
    style={{padding:"20px", height:"100vh"}}>
    <h1 style={{color:"white", fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontSize:"100px"}}>Ea<span style={{color:"lightblue"}}>r</span>th</h1>
    <Button variant='light' onClick={SignInWithGoogle}>Sign in with Google</Button>
    </div>
    </>
    
  )
}
