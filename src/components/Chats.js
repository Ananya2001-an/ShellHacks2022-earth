import {useConv} from '../contexts/ConversationProvider'
import { Col, ListGroup, Row } from 'react-bootstrap'
import OpenConversation from './OpenConversation'
import { useUser } from '../contexts/UserProvider'

export default function Chats() {
    const {convs, setSelectedConversationIndex, selectedConversationIndex}= useConv()
    const {id} = useUser()
    return (
       <Row>
        <Col sm={4} className='border p-0'>
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
                     src={c.contactPhoto}/> {c.contactName}
                </ListGroup.Item>
                ))
            }
        </ListGroup>
        </Col>
        <Col sm={8}>
            <OpenConversation/>
        </Col>
       </Row>
    )
}
