import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../firebase";

const UserContext = React.createContext()

export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}) {
const [username, setUsername] = useState('')
const [photo, setPhoto] = useState('') 
const [id, setId] = useState('')

useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
        if(user)
        {
            setUsername(user.displayName)
            setPhoto(user.photoURL)
            setId(user.email)
        }
            
        else
        {
            setUsername('')
            setPhoto('')
            setId('')
        }  
    })
    return () => {unsubscribe(); }
}, [])
  
return (
    <UserContext.Provider value={{username, photo, id}}>
        {children}
    </UserContext.Provider>
  )
}