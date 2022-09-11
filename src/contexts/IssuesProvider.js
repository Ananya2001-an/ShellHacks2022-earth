import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import {
    collection,
    getDocs
  } from "firebase/firestore";

const IssueContext = React.createContext()

export function useIssue(){
    return useContext(IssueContext)
}

export function IssuesProvider({children}) {
const [issues, setIssues] = useState('')
const issuesCollectionRef = collection(db, "issues");

useEffect(() => {
    const getIssues = async () => {
      const data = await getDocs(issuesCollectionRef);
      setIssues(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
    };

    getIssues();
  }, []);
  
return (
    <IssueContext.Provider value={issues}>
        {children}
    </IssueContext.Provider>
  )
}