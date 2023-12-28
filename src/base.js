import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC4VK5S97hl9jXuaPAtwt1u2uAXc18AVa4",
  authDomain: "realtykey-2507d.firebaseapp.com",
  databaseURL: "https://realtykey-2507d.firebaseio.com",
  projectId: "realtykey-2507d",
  storageBucket: "realtykey-2507d.appspot.com",
  messagingSenderId: "699566007850",
  appId: "1:699566007850:web:44e76c1e51f0d547fac553",
  measurementId: "G-H9Y0PRZKBJ",
});

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { app, db, storage, auth, firebase };
