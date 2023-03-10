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
  const [errors, setErrors] = useState({})
  const [userData, setUserData] = useState({email:"", password:""})
  const user = useAuth()

const onInputChange = (event) => {
  const name = event.target.name
  const value = event.target.value
  validateUserData()
  setUserData({...userData, [name]: value})
  setErrors({...errors, [name]: ""})
  console.log("valueta:",{[name]: value});
}
const onEmailChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event)) {
      errors.emailreg = "Please enter a valid email address";
    } 
    else{
      setRegisterEmail (event)
console.log("reg" ,registerEmail);
errors.emailreg = null
}
  setUserData({...userData, [name]: event})
  setErrors({...errors, [name]: ""})
}

const onPasswordChange = (value) =>{
  const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if(!passwordregex.test(value)){
      setErrors({...errors, passreg: "Minimum eight characters, at least one letter and one number"})

  }
  else{
    setRegisterPassword(value)
    errors.passreg = null
  }

  
  console.log(errors);
  return errors
}

const register = async() => {
  try{
    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  }catch(error){
  setErrors({...errors, emailreg: "Email already in use"})

  }
}


  const logout = async() => {
    await signOut(auth) 
  }

  return (
    <div className='signUpPage'>

      <h1 class="h3 mb-3 font-weight-normal">Sign up page</h1>
      <input type={"email"} placeholder='E-mail address' name='emailreg' onChange={(event) => {onEmailChange(event.target.value)}} class="form-control"/>
      {errors.emailreg && <span className='error text-danger'> {errors.emailreg}</span>}
      <input type={'password'} placeholder='Password' name='passreg' onChange={(event) => {onPasswordChange(event.target.value)}} class="form-control"/>
      {errors.passreg && <span className='error text-danger'> {errors.passreg}</span>}
      <button className='signUpButton btn btn-lg btn-primary btn-block' onClick={register}>SIGN UP</button>
      <h3>
        User logged in:
      </h3>
      {user?.email}
      <button className='mb-3' onClick={logout}>sign out</button>
    </div>
  )
    }
