import React, { createContext, useContext, useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false);

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async (codeResponse) => {
      try {
        const { code } = codeResponse; 
        localStorage.setItem("token",code);
        setIsLogging(true);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const logOut = () => {
    googleLogout()
    setIsLogging(false)
    localStorage.removeItem("token")
  };

 // useEffect(() =>{
  //const token = localStorage.getItem("token");
   // if(token){
    //setIsLogging(true)
  //}
 //},[])
  return (
    <AuthContext.Provider value={{ isLogging, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
