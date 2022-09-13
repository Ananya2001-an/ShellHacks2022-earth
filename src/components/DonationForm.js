import { Button, Card, Badge } from 'react-bootstrap'
import axios from 'axios'
import { useUser } from '../contexts/UserProvider'
import { db } from '../firebase';
import {
  collection,query,
  where, onSnapshot
} from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function DonationForm() {
  const {id} = useUser()
  const courseCollectionRef = collection(db, "courses");
  const query1 = query(courseCollectionRef, where('courseName', '==', 'Let\'s explore the sea creatures'))
  const query2 = query(courseCollectionRef, where('courseName', '==', "Let's explore life in the desert!"))
  const query3 = query(courseCollectionRef, where('courseName', '==', "The world of ice and who else?"))
  const [results1, setResults1] = useState([])
  const [results2, setResults2] = useState([])
  const [results3, setResults3] = useState([])

  function handleCheckout(cid)
  {
    const details = [{id: cid, userId: id}]
    axios.post("http://localhost:5000/create-checkout-session", details)
      .then(res => {
          window.location.replace(res.data.url)
      })
      .catch(e => {
        console.error(e.error)
      })
  }

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

  return (
    <>
    <p className='text-center'>
        <span style={{fontStyle:"italic", fontWeight:"bold"}}>"Earth"</span> provides you cool AR supported lessons
        to make learning a bit more fun and the best part is that all of the money that would get collected
        from you would get straight away donated to big non profit organizations that are working towards
        making Earth a better place to live in.💚    
    </p>
    <Card>
        <Card.Body className='d-flex' style={{justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{color:"rgb(0,211,0)"}}>Let's explore the sea creatures</h4>
        <h5 style={{color:"rgb(0,211,0)"}}>$ 120</h5>
        {
          results1.some(user => user === id) && <Badge pill bg='success'>Course Added</Badge>||
          <Button onClick={()=>handleCheckout(1)} variant='dark' style={{color:"rgb(0,211,0)"}}>Buy</Button>

        }
        </Card.Body>
    </Card>
    <Card>
        <Card.Body className='d-flex' style={{justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{color:"rgb(0,211,0)"}}>Let's explore life in the desert!</h4>
        <h5 style={{color:"rgb(0,211,0)"}}>$ 100</h5>
        {
          results2.some(user => user === id) && <Badge pill bg='success'>Course Added</Badge>||
          <Button onClick={()=>handleCheckout(2)} variant='dark' style={{color:"rgb(0,211,0)"}}>Buy</Button>

        }
        </Card.Body>
    </Card>
    <Card>
        <Card.Body className='d-flex' style={{justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{color:"rgb(0,211,0)"}}>The world of ice and who else?</h4>
        <h5 style={{color:"rgb(0,211,0)"}}>$ 80</h5>
        {
          results3.some(user => user === id) && <Badge pill bg='success'>Course Added</Badge>||
          <Button onClick={()=>handleCheckout(3)} variant='dark' style={{color:"rgb(0,211,0)"}}>Buy</Button>

        }
        </Card.Body>
    </Card>
    </>
  )
}
