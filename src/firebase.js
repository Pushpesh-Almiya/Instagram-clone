import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBKuSI9U3kaIDChknjsvh0PEQzqnesuxSg",
  authDomain: "instagram-clone-react-4de89.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-4de89-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-4de89",
  storageBucket: "instagram-clone-react-4de89.appspot.com",
  messagingSenderId: "859026581478",
  appId: "1:859026581478:web:8a28d08f2da1555de05827",
  measurementId: "G-FTN7GWH7ET"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export { db, auth, storage}