// https://firebase.google.com/docs/web/modular-upgrade#update_imports_to_compat
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyApeajyDJ2PBrnIjXWDaaC0Cak1GbejdJ0",
  authDomain: "share-your-video-d2c48.firebaseapp.com",
  projectId: "share-your-video-d2c48",
  storageBucket: "share-your-video-d2c48.appspot.com",
  messagingSenderId: "254687774785",
  appId: "1:254687774785:web:71f24f22d544d006639ec0",
  measurementId: "G-HHEKLG7148",
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

export { firebase, auth, db }
