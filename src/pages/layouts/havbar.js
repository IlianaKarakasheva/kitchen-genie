import { firestore, storage, auth } from "../../../firebase/clientApp";
import {useAuth} from "../signup/useAuth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from "next/router";



export default function Navbar() {
  const user = useAuth()
  const router = useRouter()

  
  const logout = async() => {
      console.log('user:', user);
    await signOut(auth) 
    router.push("/signin")
    // Cookies.remove("loggedin")
  }

//   console.log("user:", user);

//   const logout = async() => {
//     await signOut(auth) 
//   }

    return (
        <header class="navbar shadow-sm d-flex flex-wrap">
        
            <div class="container">
            <a href="/" class="navbar-brand d-flex align-items-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"></svg> */}
                <strong>
                    <i className="bi bi-egg-fried me-2"></i>KitchenGenie</strong>
                    
            </a>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        {/* <a href="/my-profile" class="navbar-link">
                            <button class="btn btn-sm ">My profile</button>
                            </a>
                            <a href="/saved-recipes" class="navbar-link">
                            <button class="btn btn-sm ">Saved Recipes</button>
                        </a> */}
                        <a href="/" class="navbar-link">HOME</a>
                        <a href="/new-recipe" class="btn btn-sm btn-primary">
                            <b>ADD NEW RECIPE</b>
                        </a>
                        {/* <a href="/about" class="navbar-link">ABOUT</a> */}
                        <a href="/contacts" class="navbar-link">CONTACTS</a>
                    </li>
                
                </ul>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        {/* {user?.email} */}{user ? (
              <>
              <a href="#" className="navbar-link me-2">
                <b>{user.email}</b>
              </a>
              <button className="btn btn-sm btn-secondary" onClick={logout}
              >
                <b>Logout</b>
              </button>
            </>
          ) : (
            <>
              <a href="/signin" className="btn btn-sm btn-secondary me-2">
                <b>Sign In</b>
              </a>
              <a href="/signup" className="btn btn-sm btn-secondary">
                <b>Register</b>
              </a>
            </>
          )}
                    </li>
                </ul>
            </div>
        
        </header>
    )
}  