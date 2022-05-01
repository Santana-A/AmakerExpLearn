// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo } from "firebase/auth";
  
import { useState, useEffect } from "react";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEFnmbJDbfcfYNnCVnocafYPhvGoNBD7c",
  authDomain: "experiential-learning-logger.firebaseapp.com",
  projectId: "experiential-learning-logger",
  storageBucket: "experiential-learning-logger.appspot.com",
  messagingSenderId: "56387913614",
  appId: "1:56387913614:web:1fc2a5124a87d5285986df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export function signInWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' });
  return signInWithPopup(auth, googleAuthProvider);
}

export const signInWithGoogleStudent = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' });
    signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      const email = result.user.email;
      const photo = result.user.photoURL;
      const domain = email.split('@')[1];
      localStorage.setItem("email", email);
      localStorage.setItem("photo", photo);
      console.log(domain);
      console.log(email);
      if(!(domain === 'go.olemiss.edu')){
        signOut(auth);
        window.alert("Unauthorized domain. Please use a email ending in go.olemiss.edu");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithGoogleRep = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({ 'prompt': 'select_account' });
  signInWithPopup(auth, googleAuthProvider)
  .then((result) => {
      const email = result.user.email;
      const domain = email.split('@')[1];
      console.log("this is rep user" + email);
      localStorage.setItem("email", email);
    if(!(domain === 'gmail.com')){
      signOut(auth);
      alert("Unauthorized domain. Please use a email ending in olemiss.edu or cs.olemiss.edu");
    }
  })
  .catch((error) => {
    console.log(error);
  });
};


export function logOut() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsubscribe;
  }, [])
  return currentUser;
}

// export function useStudentAuth() {
//   const [currentStudentUser, setCurrentStudentUser] = useState();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, user => setCurrentStudentUser(user));
//     return unsubscribe;
//   }, [])
//   return currentStudentUser;
// }

// export function useRepAuth() {
//   const [currentRepUser, setCurrentRepUser] = useState();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, user => setCurrentRepUser(user));
//     return unsubscribe;
//   }, [])
//   return currentRepUser;
// }


// export function validStudentAccount(userEmail){
//   return userEmail.split('@')[1] === 'go.olemiss.edu';
//   // userEmail.split('@')[1] === 'olemiss.edu' || 
//   // userEmail.split('@')[1] === 'cs.olemiss.edu';
// }

export function validRepAccount(userEmail){
  return userEmail.split('@')[1] === 'gmail.com';
  // return userEmail.split('@')[1] === 'go.olemiss.edu' || 
  // userEmail.split('@')[1] === 'olemiss.edu' || 
  // userEmail.split('@')[1] === 'cs.olemiss.edu';
}

export function validStuAccount(userEmail){
  return userEmail.split('@')[1] === 'go.olemiss.edu';
  // userEmail.split('@')[1] === 'olemiss.edu' || 
  // userEmail.split('@')[1] === 'cs.olemiss.edu';
}

// export function userExists(){
//   return getAdditionalUserInfo(auth).isNewUser();
// }