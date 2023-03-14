import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";


import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  const router = useRouter()
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errors, setErrors] = useState({})
  const {login, user} = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  // console.log(user);


  const handleLogin = async () => {
    // event.preventDefault()
    try {
      await login(data.email, data.password)
     router.push("/")
    } catch (error) {
  setErrors({...errors, emailreg: "Wrong email or password"})
    }
  };

  useEffect(()=>{
    if(user){
      router.push("/")
    }
  }, [user])
  // const signout =async  () => {
  //   await logout()
  // }

  return (
      <blockquote>
          <div className="signUpPage">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Enter email"
              value={data.email}
              onChange={(event) => setData({...data, email: event.target.value, })}
              required=""
              autofocus=""
            />

            <label for="inputPassword" class="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Enter password"
              value={data.password}
              onChange={(event) => setData({...data, password: event.target.value,})}
              required=""
            />
                  {errors.emailreg && <span className='error text-danger'> {errors.emailreg}</span>}

            <div class="checkbox mb-3">
              <label>
              </label>
            </div>
            <button
              class="btn btn-lg btn-primary btn-block"
              type="submit"
              onClick={handleLogin}
            >
            Sign in
            </button>
          </div>
      </blockquote>
  );
}

