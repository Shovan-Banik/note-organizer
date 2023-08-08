import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import axios from "axios";
import app from "../../firebase.config";

export const AuthContext=createContext();

const auth=getAuth(app);


const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const profileUpdate=(name,photoUrl)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photoUrl
        })
        .then(result=>{
            console.log(result);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current user',currentUser);
            // get and set token

            if(currentUser){
                axios.post('http://localhost:5000/jwt',{email:currentUser.email})
                .then(data=>{
                    localStorage.setItem("access-token",data.data.token)
                })
            }
            else{
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });
        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo={
        user,
        createUser,
        profileUpdate,
        signIn,
        googleSignIn,
        logOut,
        loading,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;