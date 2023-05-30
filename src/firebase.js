import firebase from "firebase";
/* const firebaseConfig = {
  apiKey: "AIzaSyAko2gWSHPupgr6d0ilTuro-WE1ttoM-Nw",
  authDomain: "dashboard-ubytes.firebaseapp.com",
  databaseURL: "https://dashboard-ubytes-default-rtdb.firebaseio.com",
  projectId: "dashboard-ubytes",
  storageBucket: "dashboard-ubytes.appspot.com",
  messagingSenderId: "15791377745",
  appId: "1:15791377745:web:0058568bf275fc4da65770",
}; */
 const firebaseConfig = {
   apiKey: "AIzaSyAko2gWSHPupgr6d0ilTuro-WE1ttoM-Nw",
   authDomain: "dashboard-ubytes.firebaseapp.com",
   databaseURL: "https://dashboard-ubytes-default-rtdb.firebaseio.com",
   projectId: "dashboard-ubytes",
   storageBucket: "dashboard-ubytes.appspot.com",
   messagingSenderId: "15791377745",
   appId: "1:15791377745:web:0058568bf275fc4da65770",
 };
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
const db = firebase.firestore();
export const auth = firebase.auth();

export default db;
