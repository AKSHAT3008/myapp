import firebase from "firebase/compat/app"
import {GoogleAuthProvider,signInWithPopup} from "firebase/compat/auth"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  
})
export const auth = app.auth()
export default app
var provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);
