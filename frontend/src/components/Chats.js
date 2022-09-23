import {useConv} from '../contexts/ConversationProvider'
import { Col, ListGroup, Row } from 'react-bootstrap'
import OpenConversation from './OpenConversation'
import { useUser } from '../contexts/UserProvider'

export default function Chats() {
    const {convs, setSelectedConversationIndex, selectedConversationIndex}= useConv()
    const {id} = useUser()
    return (
       <Row>
        <Col sm={5} className='p-0 overflow-auto' style={{border:"1px solid rgb(0, 211, 0)"}}>
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
                }} >
                    <img style={{width:"35px", height:"35px", borderRadius:"50%"}}
                     src={c.contactPhoto}/> {c.contactName}<br/> <span style={{fontWeight:"bold"}}>#Issue:</span> {c.issueName}
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
