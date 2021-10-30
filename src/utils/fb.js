import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXAE-It00BVpsZtwcvxIRIjJcwpFUEK5s",
  authDomain: "wk-4d041.firebaseapp.com",
  projectId: "wk-4d041",
  storageBucket: "wk-4d041.appspot.com",
  messagingSenderId: "867480058756",
  appId: "1:867480058756:web:fc65d668bfa358fb19bbd1"
};

const app = firebase.initializeApp(firebaseConfig);
const fstore = app.firestore();
const increment = firebase.firestore.FieldValue.increment;
const fauth = app.auth();
const fstorage = app.storage();

const GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();
export { app, fstore, fauth, increment, GOOGLE_PROVIDER, fstorage };
