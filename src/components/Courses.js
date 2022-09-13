import {useQuery} from '../contexts/QueryProvider'
import { Col, Row, Nav, Tab } from 'react-bootstrap'
import { useUser } from '../contexts/UserProvider'
import OpenCourse from './OpenCourse'

export default function Courses() {
    const {id} = useUser()
    const {results1, results2, results3}= useQuery()

    return (
        <Tab.Container defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item> 
                <Nav.Link eventKey="first">Let's explore the sea creatures</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Let's explore life in the desert!</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">The world of ice and who else?</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} style={{paddingLeft:"30px"}}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                {
                    results1.some(user => user === id) &&
                    <OpenCourse course="Let's explore the sea creatures"/> ||
                    <h2>Course not bought yet.</h2>
                }
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                {
                    results2.some(user => user === id) &&
                    <OpenCourse course="Let's explore life in the desert!"/>||
                    <h2>Course not bought yet.</h2>
                }
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                {
                    results3.some(user => user === id) &&
                    <OpenCourse course="The world of ice and who else?"/>||
                    <h2>Course not bought yet.</h2>
                }
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
}
