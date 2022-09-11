import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import {
    collection,
    getDocs
  } from "firebase/firestore";
import { useUser } from './UserProvider';

const ConvContext = React.createContext()

export function useConv(){
    return useContext(ConvContext)
}

export function ConversationProvider({children}) {
const [convs, setConvs] = useState('')
const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
const convsCollectionRef = collection(db, "convs");

useEffect(() => {
    const getConvs = async () => {
      const data = await getDocs(convsCollectionRef);
      setConvs(data.docs.map((doc) =>({ ...doc.data(), docId: doc.id })));
    };

    getConvs();
  }, []);
  
  const value={
    convs,
    setSelectedConversationIndex,
    selectedConversation: convs[selectedConversationIndex],
    selectedConversationIndex
  }
return (
    <ConvContext.Provider value={value}>
        {children}
    </ConvContext.Provider>
  )
}