import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../firebase/clientApp";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser]= useState(null)   
    const [loading, setLoading] = useState(true)

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        if(user){
            setUser({
                uid: user.uid,
                email: user.email,  
            })
        }
            else{
                setUser(null)
            
        }
    })
    setLoading(false)
    return () => unsubscribe()

}, [auth])

  return <AuthContext.Provider value={{user}}>{loading?null:children}</AuthContext.Provider>;
};
