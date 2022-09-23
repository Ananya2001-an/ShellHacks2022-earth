import { Button, Badge } from 'react-bootstrap'
import { useIssue } from '../contexts/IssuesProvider'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useUser } from '../contexts/UserProvider'

export default function RaisedIssues() {
    const issues = useIssue()
    const {id} = useUser()

    const updateIssue = async (issue) => {
        const issueDoc = doc(db, "issues", issue.docId);
        const newFields = { isOpen: !issue.isOpen };
        await updateDoc(issueDoc, newFields);
    }

  return (
    <div>
    {
        issues !== '' && 
        issues.map((i)=> 
        { 
            if(i.userId === id) 
            {
              return <>
              <Badge pill bg= {i.isOpen ? "success": "danger"} >{i.isOpen ? "Open": "Closed"}</Badge>
              <div style={{display:"grid",gridTemplateColumns:"auto 150px"}}>
              <h5>{i.title}</h5>
              <Button onClick={()=>updateIssue(i)} variant= {i.isOpen ? "danger": "success"}>{i.isOpen ? "Close this issue": "Open issue again"}</Button>
              </div>
              <hr></hr>
              </>
            }
        })
    }
    </div>
  )
}
