import { firestore, storage, auth } from "../../../firebase/clientApp";
import {useAuth} from "../../context/AuthContext";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from "next/router";
import Link from "next/link";



export default function Navbar() {
  const {user, logout} = useAuth()
  const router = useRouter()

  
  const signOut = async() => {
      // console.log('user:', user);
    await logout() 
    router.push("/signin")
  }

    return (
        <header class="navbar shadow-sm d-flex flex-wrap">
        
            <div class="container">
            <Link href="/" class="navbar-brand d-flex align-items-center">
                <strong>
                    <i className="bi bi-egg-fried me-2"></i>KitchenGenie</strong>
            </Link>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        <Link href="/" class="navbar-link">HOME</Link>
                        <Link href="/new-recipe" class="btn btn-sm btn-primary">
                            <b>ADD NEW RECIPE</b>
                        </Link>
                        <Link href="/about" class="navbar-link">ABOUT</Link>
                    </li>
                
                </ul>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        {user ? (
              <>
              <Link href="#" className="navbar-link me-2">
              {user.email}
              </Link>
              <button className="btn btn-sm btn-secondary" onClick={signOut}>
                <b>Logout</b>
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-secondary me-2">
                <b>Sign In</b>
              </Link>
              <Link href="/signup" className="btn btn-sm btn-secondary">
                <b>Register</b>
              </Link>
            </>
          )}
                    </li>
                </ul>
            </div>
        </header>
    )
}  