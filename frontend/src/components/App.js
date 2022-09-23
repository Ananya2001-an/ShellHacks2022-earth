import '../App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { useUser } from "../contexts/UserProvider";
import { useEffect } from "react";
import Success from './Success';
import Cancel from './Cancel';

function App() {
  const {username}= useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(username !== ''){
      setTimeout(()=>{
        navigate("/dashboard")
      },5000)
    }else{
      setTimeout(()=>{
        navigate("/")
      },5000)
    }
  }, [username])

  return (
    <>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/dashboard/success" element={<Success />}></Route>
      <Route path="/dashboard/cancel" element={<Cancel />}></Route>
      <Route path='/' element={<SignIn/>}></Route>
    </Routes>
    </>
  );
}

export default App;
