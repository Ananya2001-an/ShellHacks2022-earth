import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import {
  collection,query,
  where, onSnapshot
} from "firebase/firestore";

const QueryContext = React.createContext()

export function useQuery(){
    return useContext(QueryContext)
}

export function QueryProvider({children}) {
  const courseCollectionRef = collection(db, "courses");
  const query1 = query(courseCollectionRef, where('courseName', '==', 'Let\'s explore the sea creatures'))
  const query2 = query(courseCollectionRef, where('courseName', '==', "Let's explore life in the desert!"))
  const query3 = query(courseCollectionRef, where('courseName', '==', "The world of ice and who else?"))
  const [results1, setResults1] = useState([])
  const [results2, setResults2] = useState([])
  const [results3, setResults3] = useState([])

useEffect(()=>{
    onSnapshot(query1, snap=>{
      snap.docs.map(doc=>{
        setResults1(prev=>[...prev, doc._document.data.value.mapValue.fields.userId.stringValue])
      })
    })
    onSnapshot(query2, snap=>{
      snap.docs.map(doc=>{
        setResults2(prev=>[...prev, doc._document.data.value.mapValue.fields.userId.stringValue])
      })
    })
    onSnapshot(query3, snap=>{
      snap.docs.map(doc=>{
        setResults3(prev=>[...prev, doc._document.data.value.mapValue.fields.userId.stringValue])
      })
    })
  }, [])

  const value ={
    results1, results2, results3
}
  
return (
    <QueryContext.Provider value={value}>
        {children}
    </QueryContext.Provider>
  )
}