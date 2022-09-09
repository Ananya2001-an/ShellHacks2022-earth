import '../App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import SignIn from './SignIn';
import Navbar from './Nav';
import Dashboard from './Dashboard';
import { useUser } from "../contexts/UserProvider";
import { useEffect } from "react";

function App() {
  const {username}= useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(username !== ''){
      navigate("/dashboard")
    }else{
      navigate("/")
    }
  }, [username])

  return (
    <>
    <Routes>
      <Route element={<Navbar/>}>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
      <Route path='/' element={<SignIn/>}></Route>
    </Routes>
    </>
  );
}

export default App;
