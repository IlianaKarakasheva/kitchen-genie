import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { firestore, storage, auth } from '../../../firebase/clientApp';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {useAuth} from "./useAuth";


const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // const [user, setUser] = useState({})
  const user = useAuth()

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser)
  // })

  const register = async() => {
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user);
    }catch(error){
      console.log(error.message);
    }
  }

  const logout = async() => {
    await signOut(auth) 
  }
  const login = async() =>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user);
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className='signUpPage'>

      <h1 class="h3 mb-3 font-weight-normal">Sign up page</h1>
      <input type={"email"} placeholder='E-mail address'  onChange={(event) => {setRegisterEmail(event.target.value)}} class="form-control"/>
      <input type={'password'} placeholder='Password'  onChange={(event) => {setRegisterPassword(event.target.value)}} class="form-control"/>
      <button className='signUpButton btn btn-lg btn-primary btn-block' onClick={register}>SIGN UP</button>
      <h3>
        User logged in:
      </h3>
      {user?.email}
      <button className='mb-3' onClick={logout}>sign out</button>
    </div>
  )
    }
