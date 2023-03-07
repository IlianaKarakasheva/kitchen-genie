import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { firestore, storage, auth } from "../../../firebase/clientApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuth } from "../signup/useAuth.js";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const user = useAuth();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
    console.log(user);
  };

  return (
    <div className="container justify-content-center align-items-center col">
      <blockquote>
        {/* <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/> */}
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div className="col-3">
          <div className="signInPage">
            <label for="inputEmail" class="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
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
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
              required=""
            />
            <div class="checkbox mb-3">
              <label>
                {/* <input type="checkbox" value="remember-me" /> Remember me */}
              </label>
            </div>
            <button
              class="btn btn-lg btn-primary btn-block"
              type="submit"
              onClick={login}
            >
              Sign in
            </button>
            {/* <p class="mt-5 mb-3 text-muted">© 2017-2018</p> */}
            <h3>User logged in:</h3>
            {user?.email}
            <button onClick={logout}>sign out</button>
          </div>
        </div>
      </blockquote>
    </div>
  );
}
