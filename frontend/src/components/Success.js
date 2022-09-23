import { useSearchParams } from "react-router-dom"
import { db } from '../firebase';
import {
  collection,
  addDoc
} from "firebase/firestore";
import { useEffect } from "react";

export default function Success() {
    const [searchParams, setSearchParams] = useSearchParams()
    const courseCollectionRef = collection(db, "courses");

    useEffect(async()=>{
        await addDoc(courseCollectionRef, {courseName:searchParams.get('courseName'), userId: searchParams.get('user')})
    },[])

    return (
        <>
        <h3>Payment was successful. Added course "{searchParams.get('courseName')}" to your account.</h3>
        <p>Returning to dashboard in 5 seconds.</p>
        </>
    )
}
