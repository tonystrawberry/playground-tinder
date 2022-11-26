// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6FZDUewvwPCINDQ5buUXVV6ZoCVqWmNA",
  authDomain: "playground-tinder.firebaseapp.com",
  projectId: "playground-tinder",
  storageBucket: "playground-tinder.appspot.com",
  messagingSenderId: "787923097093",
  appId: "1:787923097093:web:cc1a0d0b6985c516b5ae6c",
  measurementId: "G-K71QTCYKY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
