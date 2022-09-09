import firebase from 'firebase/compat/app'
import {GoogleAuthProvider, signInWithPopup, getAuth, signOut} from "firebase/auth" 
import {getStorage} from 'firebase/storage'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const provider = new GoogleAuthProvider()
export const auth = getAuth(app) 
export const storage = getStorage(app);

export function SignInWithGoogle(){
    signInWithPopup(auth, provider).then((result)=>{
    }).catch(err=>{
        console.log(err)
    })
}

export const SignOut = ()=>{
    signOut(auth).then((res)=>{
        console.log(res)
    }).catch(err =>{console.log(err)})
}