
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const PexelsAPI = require('pexels-api-wrapper');
const pexels = new PexelsAPI("");

export { firebase, db, pexels }