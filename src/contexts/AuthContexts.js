import React, { useContext, useEffect, useState } from 'react'
import { auth,signInWithGoogle } from '../firebase';

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut()
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function googleSignIn(){
        return signInWithGoogle().then((result) => {
            const email = result.user.email;
        })
    }

    useEffect(()=> {
        const unsubscribed = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
            
        })
        return unsubscribed
    },[])
    
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        googleSignIn,
    }
  return (
    <AuthContext.Provider value={value} >
        {!loading && children}
    </AuthContext.Provider>
  )
}
