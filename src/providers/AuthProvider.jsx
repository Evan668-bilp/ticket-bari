import React, { createContext, useEffect, useState } from 'react';

import { auth } from "../firebase.config";


// import { auth } from '../firebase/firebase.config';


import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // চ্যালেঞ্জ: ডার্ক/লাইট মোড

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);
  const updateUserProfile = (name, photo) => updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {


        axios.post('http://localhost:5000/api/auth/jwt', { email: currentUser.email })
          .then(res => localStorage.setItem('token', res.data.token))
          .catch(err => toast.error(err.message));
        axios.post('http://localhost:5000/api/auth/users', { name: currentUser.displayName, email: currentUser.email, photo: currentUser.photoURL });
      } 
      
      else {
        localStorage.removeItem('token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const authInfo = { user, loading, createUser, login, googleLogin, logout, updateUserProfile, toggleTheme, theme };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;