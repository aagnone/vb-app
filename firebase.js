import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBkGevzgsObu16AeFaAghNmkVQjcRucCPE",
    authDomain: "volleyball-manager-app1.firebaseapp.com",
    databaseURL: "https://volleyball-manager-app1-default-rtdb.firebaseio.com",
    projectId: "volleyball-manager-app1",
    storageBucket: "volleyball-manager-app1.appspot.com",
    messagingSenderId: "176526376732",
    appId: "1:176526376732:web:d6270b3f3e56e87c40c4d9"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

export const auth = firebase.auth();

export default db;