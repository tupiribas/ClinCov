//import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSqVAGWJh_LyJr_0V7EFpuqT-oDmHwmbE",
  authDomain: "clincov-c378a.firebaseapp.com",
  databaseURL: "https://clincov-c378a-default-rtdb.firebaseio.com",
  projectId: "clincov-c378a",
  storageBucket: "clincov-c378a.appspot.com",
  messagingSenderId: "96721417754",
  appId: "1:96721417754:web:32e8580346771c040283a3",
  measurementId: "G-DVCNQMTJPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


if(!firebase.apps.length) {

  const app = firebase.initializeApp(firebaseConfig);

}
export default firebase;