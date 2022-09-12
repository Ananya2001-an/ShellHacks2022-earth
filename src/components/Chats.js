import {useConv} from '../contexts/ConversationProvider'
import { Col, ListGroup, Row } from 'react-bootstrap'
import OpenConversation from './OpenConversation'
import { useUser } from '../contexts/UserProvider'

export default function Chats() {
    const {convs, setSelectedConversationIndex, selectedConversationIndex}= useConv()
    const {id} = useUser()
    return (
       <Row>
        <Col sm={5} className='border p-0'>
        <ListGroup variant='flush'>
            {
                convs !== "" &&
                convs.map((c, index)=>(
                c.userId === id && 
                <ListGroup.Item  key={index}
                action
                active={selectedConversationIndex === index}
                onClick={()=>{
                    setSelectedConversationIndex(index)
                }}>
                    <img style={{width:"35px", height:"35px", borderRadius:"50%"}}
                     src={c.contactPhoto}/> {c.contactName}<br/> Issue: {c.issueName}
                </ListGroup.Item>
                ))
            }
        </ListGroup>
        </Col>
        <Col sm={7}>
            <OpenConversation/>
        </Col>
       </Row>
    )
}
