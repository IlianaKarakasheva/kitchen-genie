import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({children}) => {
  const user = useAuth()
  const router = useRouter()

    console.log(user);
  useEffect(()=>{
    if(user != null){
        router.push("/signin")
    }
  },[router, user])
  
    return <>{user? children : null}</>
};

export default ProtectedRoute;
