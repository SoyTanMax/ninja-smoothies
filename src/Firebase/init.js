import firebase from 'firebase';
import firestore from 'firebase/firestore'

//Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDgO301C9ZBJ0_KF-SG9WLUMJRGPOi8cRo",
    authDomain: "udemy-ninja-smoothies-d98ba.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-d98ba.firebaseio.com",
    projectId: "udemy-ninja-smoothies-d98ba",
    storageBucket: "udemy-ninja-smoothies-d98ba.appspot.com",
    messagingSenderId: "495825792662",
    appId: "1:495825792662:web:ca1087cfc9fb49937b1cb7",
    measurementId: "G-S3TWHCD7SX"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

//Export the firestore database

export default firebaseApp.firestore()