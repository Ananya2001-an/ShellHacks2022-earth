import React, { useState } from 'react'
import { Form, Accordion, Button } from 'react-bootstrap'
import { db } from '../firebase';
import {
  collection,
  addDoc
} from "firebase/firestore";
import { useUser } from '../contexts/UserProvider';

export default function IssueForm() {
    const {id, username, photo} = useUser()
    const issuesCollectionRef = collection(db, "issues");
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [tags, setTags] = useState('')
    const [donate, setDonate] = useState('')
    const [prompt, setPrompt] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await addDoc(issuesCollectionRef, { userId: id,username: username,userPhoto: photo,
             title: title, desc: desc, tags: tags, donate: donate, prompt: prompt,
              isOpen: 'true'});
        alert('Issue added successfully!')
    }

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
            <Form.Control required onChange={(event) => {
            setTags(event.target.value);
            }} type='text' placeholder='for e.g; ocean, sharkfinhunting, ...'></Form.Control>
        </Form.Group>
        <div className='mb-2'>
            Or you can choose from here: (click to add)
            <div style={{overflow:'auto', height:"70px", border:"1px solid lightblue"}}>
                {

                }
            </div>
        </div>
        <Form.Group className='mb-2'>
            <Form.Label style={{fontWeight:"bold"}}>4. How someone can help you remotely? (optional)</Form.Label>
            <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>By donating funds</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>By providing engineering solutions</Accordion.Header>
                <Accordion.Body>
                    <Form.Group>
                        <Form.Label>
                            Add Problem Prompt
                        </Form.Label>
                        <Form.Control onChange={(event) => {
                        setPrompt(event.target.value);
                        }} placeholder='for e.g; we need someone to build us a software that...'></Form.Control>
                    </Form.Group>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </Form.Group>
        <Button variant='light' style={{color:"white"}} type="submit">Create</Button>
    </Form>
  )
}
