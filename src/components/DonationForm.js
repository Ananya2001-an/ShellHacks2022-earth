import { Button, Card } from 'react-bootstrap'
import axios from 'axios'

export default function DonationForm() {

  function handleCheckout(id)
  {
    const details = [{id: id}]
    axios.post("http://localhost:5000/create-checkout-session", details)
      .then(res => {
          window.location.replace(res.data.url)
      })
      .catch(e => {
        console.error(e.error)
      })
  }
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
        <Button onClick={()=>handleCheckout(1)} variant='dark' style={{color:"rgb(0,211,0)"}}>Donate</Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Body className='d-flex' style={{justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{color:"rgb(0,211,0)"}}>Let's explore life in the desert!</h4>
        <h5 style={{color:"rgb(0,211,0)"}}>$ 100</h5>
        <Button onClick={()=>handleCheckout(2)} variant='dark' style={{color:"rgb(0,211,0)"}}>Donate</Button>
        </Card.Body>
    </Card>
    <Card>
        <Card.Body className='d-flex' style={{justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{color:"rgb(0,211,0)"}}>The world of ice and who else?</h4>
        <h5 style={{color:"rgb(0,211,0)"}}>$ 80</h5>
        <Button onClick={()=>handleCheckout(3)} variant='dark' style={{color:"rgb(0,211,0)"}}>Donate</Button>
        </Card.Body>
    </Card>
    </>
  )
}
