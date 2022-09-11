import React, { useEffect, useState } from 'react'
import { Form, Button, Badge } from 'react-bootstrap'
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";
import { useUser } from '../contexts/UserProvider';

export default function IssueForm() {
    const {id, username, photo} = useUser()
    const issuesCollectionRef = collection(db, "issues");
    const tagsCollectionRef = collection(db, "tags");
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [tags, setTags] = useState('')
    const [fetchTags, setFetchTags] = useState('')
    const [prompt, setPrompt] = useState('')
    let badgeColors = ['primary', 'secondary','warning','danger','success', 'info', 'dark']

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await addDoc(issuesCollectionRef, { userId: id,username: username,userPhoto: photo,
             title: title, desc: desc, tags: tags, prompt: prompt,involved: [photo],
              isOpen: true});
        let tagArray = tags.split(',')
        tagArray.map(async tag=>{
            await addDoc(tagsCollectionRef, {tag: tag})
        })
        alert('Issue added successfully!')
    }


    function addTag(tag){
        setTags(prev=> `${prev},${tag.tag}`)
    }

    useEffect(() => {
        const getTags = async () => {
          const data = await getDocs(tagsCollectionRef);
          setFetchTags(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
        };
    
        getTags();
      },[]);    

  return (
    <Form onSubmit={handleSubmit} style={{width:"650px"}}>
        <Form.Group className='mb-2'>
            <Form.Label style={{fontWeight:"bold"}}>1. Title</Form.Label>
            <Form.Control required onChange={(event) => {
            setTitle(event.target.value)}} type='text'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
            <Form.Label style={{fontWeight:"bold"}}>2. Description</Form.Label>
            <Form.Control required onChange={(event) => {
            setDesc(event.target.value);
            }} type='text'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-2'>
            <Form.Label style={{fontWeight:"bold"}}>3. Add tags (separated by commas)</Form.Label>
            <Form.Control required value={tags} onChange={(event) => {
            setTags(event.target.value);
            }} type='text' placeholder='for e.g; ocean, sharkfinhunting, ...'></Form.Control>
        </Form.Group>
        <div className='mb-2'>
            Or you can choose from here: (click to add)
            <div style={{overflow:'auto', height:"70px",padding:"10px", border:"1px solid lightblue"}}>
            {
                fetchTags !== "" &&
                fetchTags.map(tag=>{
                    return <Badge bg={badgeColors[Math.floor(Math.random()*badgeColors.length)]}
                    className='px-2 mx-1'>
                        <a onClick={()=>addTag(tag)} style={{cursor:"pointer"}}>{tag.tag}</a>
                    </Badge>
                })
            }
            </div>
        </div>
        <Form.Group className='mb-4'>
            <Form.Label style={{fontWeight:"bold"}}>4. How someone can help you remotely?</Form.Label>
           
            <Form.Control required onChange={(event) => {
            setPrompt(event.target.value);
            }} placeholder='for e.g; we need someone to build us a software that...'></Form.Control>

        </Form.Group>
        <Button variant='light' style={{color:"white"}} type="submit">Create</Button>
    </Form>
  )
}
