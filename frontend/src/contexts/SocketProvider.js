import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useUser } from './UserProvider'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}

export function SocketProvider({children}) {
    const {id} = useUser()
    const [socket, setSocket] = useState()

    useEffect(()=>{
        const newSocket = io('https://earth-server.herokuapp.com/', { query: {id} })
        setSocket(newSocket)

        return () => newSocket.close()
    },[id])

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}