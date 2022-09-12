import {Nav, Button, Tab, Form, InputGroup, Dropdown} from 'react-bootstrap';
import { SignOut} from "../firebase";
import { useUser } from "../contexts/UserProvider";
import Profile from './Profile';
import { useIssue } from '../contexts/IssuesProvider';
import ViewIssues from './ViewIssues';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Dashboard() {
  const {photo} = useUser()
  const issues = useIssue()
  const tagsCollectionRef = collection(db, "tags")
  const [tags, setTags] = useState('')
  const [shownIssues, setShownIssues]= useState(issues)
  const searchRef1 = useRef()
  const searchRef2 = useRef()

  useEffect(() => {
    const getTags = async () => {
      const data = await getDocs(tagsCollectionRef);
      setTags(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
    };

    getTags();
  },[]);

  useEffect(()=>{
    setShownIssues(issues)
  }, [issues])

  function handleSearch(e, number){
    e.preventDefault()
    setShownIssues([])
    if(number === 1)
    {
      //more than 1 tags
      if(searchRef1.current.value.includes(',')){
        issues.filter(i=>{
          searchRef1.current.value.split(",").map(searchTag=>{
            
            if(i.tags.includes(searchTag) && searchTag !== ''){
              setShownIssues(prev=> [...prev, i])
            }
    
          })
        })
      }
      //only 1 tag 
    else{
      issues.filter(i=>{
        if(i.tags.includes(searchRef1.current.value))
        {
          setShownIssues(prev=> [...prev, i])
        }
      })
    }
    searchRef1.current.value = ''
    }
    else{
      if(searchRef2.current.value.includes(',')){
        issues.filter(i=>{
          searchRef2.current.value.split(",").map(searchTag=>{
            
            if(i.tags.includes(searchTag) && searchTag !== ''){
              setShownIssues(prev=> [...prev, i])
            }
    
          })
        })
      }
      //only 1 tag 
    else{
      issues.filter(i=>{
        if(i.tags.includes(searchRef2.current.value))
        {
          setShownIssues(prev=> [...prev, i])
        }
      })
    }
    searchRef2.current.value = ''
    }
    
  }

  function addTag(tag, state){
    if(state === "open")
      searchRef1.current.value = `${searchRef1.current.value},${tag.tag}`
    else
      searchRef2.current.value = `${searchRef2.current.value},${tag.tag}`
  }

  function showAll(){
    setShownIssues(issues)
  }

  return (
    <Tab.Container defaultActiveKey='open'>
      <div className='d-flex'>
      <Nav className='d-flex flex-column px-0' style={{width:"20%",height:"100vh"
      , background:"black"
      ,padding:"10px",alignItems:"center", justifyContent:"space-between"}}>
      
      <Nav.Item style={{color:"rgb(0, 211, 0)",fontFamily:"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      fontSize:"27px"}}>Earth</Nav.Item>
      
      <Nav className='flex-column align-items-center w-100'>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='profile'><img style={{width:"50px",height:"50px"
        ,border:"3px solid rgb(0, 211, 0)", borderRadius:"1.5rem"}}
         src={photo}/></Nav.Link>
      </Nav.Item>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='open' onClick={showAll}>Open Issues</Nav.Link>
      </Nav.Item>
      <Nav.Item className='text-center w-100'>
        <Nav.Link eventKey='closed' onClick={showAll}>Closed Issues</Nav.Link>
      </Nav.Item>
      </Nav>

      <Nav.Item>
      <Button variant='dark' style={{color:"rgb(0, 211, 0)"}} onClick={SignOut}>Sign Out</Button>
      </Nav.Item>
      </Nav>

      <Tab.Content className='p-3 overflow-auto' style={{width:"80%", height:"100vh"}}>
        <Tab.Pane className='overflow-auto' style={{height:"90vh", padding:"10px"}} eventKey="open">

          <Form onSubmit={(e)=>handleSearch(e,1)} className='mb-4 d-flex'>
            <InputGroup style={{marginRight:"10px"}}>
            <Form.Control ref={searchRef1} style={{background:"none", border:"2px solid black"}}></Form.Control>
            <Button type="submit" variant='dark' style={{color:"rgb(0, 211, 0)"}}>Search issue by tags</Button>
            </InputGroup>
            <Dropdown>
            <Dropdown.Toggle variant="dark" style={{color:"rgb(0, 211, 0)",border:"2px solid black"}}>
              Select Tags
            </Dropdown.Toggle>

            <Dropdown.Menu style={{height:"180px", overflow:"auto", background:"black"}}>
              {
                tags !== '' &&
                tags.map(tag=>{
                  return <Dropdown.Item style={{color:"rgb(0, 211, 0)"}}>
                    <p className='p-0 m-0' onClick={()=> addTag(tag,"open")}>{tag.tag}</p>
                  </Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          </Form>
           <ViewIssues issues={shownIssues} state="open"/>
        </Tab.Pane>
        <Tab.Pane className='overflow-auto' style={{height:"90vh", padding:"10px"}} eventKey="closed">
        <Form onSubmit={(e)=>handleSearch(e,2)} className='mb-4 d-flex'>
            <InputGroup style={{marginRight:"10px"}}>
            <Form.Control ref={searchRef2} style={{background:"none", border:"2px solid black"}}></Form.Control>
            <Button type="submit" variant='dark' style={{color:"rgb(0, 211, 0)"}}>Search issue by tags</Button>
            </InputGroup>
            <Dropdown>
            <Dropdown.Toggle variant="dark" style={{color:"rgb(0, 211, 0)",border:"2px solid black"}}>
              Select Tags
            </Dropdown.Toggle>

            <Dropdown.Menu style={{height:"180px", overflow:"auto", background:"black"}}>
              {
                tags !== '' &&
                tags.map(tag=>{
                  if(tag.tag !== '')
                  {
                    return <Dropdown.Item style={{color:"rgb(0, 211, 0)"}}>
                    <p className='p-0 m-0' onClick={()=> addTag(tag, "closed")}>{tag.tag}</p>
                    </Dropdown.Item>
                  }
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          </Form>
         <ViewIssues issues={shownIssues} state="closed"/>
        </Tab.Pane>
        <Tab.Pane eventKey="profile">
          <Profile/>
        </Tab.Pane>
      </Tab.Content>
      </div>
    </Tab.Container>
  )
}
