import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

// console.log(database)

const firebaseConfig = {
    apiKey: "AIzaSyAKaQCz1G0hbBh6PRSdYRaax8OG4t5iVyA",
    authDomain: "fir-activity-a0ada.firebaseapp.com",
    projectId: "fir-activity-a0ada",
    storageBucket: "fir-activity-a0ada.appspot.com",
    messagingSenderId: "662636678820",
    appId: "1:662636678820:web:61b0f56b0f842378eba031" 
}

let Firebase;

if(firebase.apps.length === 0){
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
export const db = Firebase.firestore();


