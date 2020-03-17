import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAnK_8WK9CkDUqNz_h0E421NspSql2u-D4",
  authDomain: "e-totur.firebaseapp.com",
  databaseURL: "https://e-totur.firebaseio.com",
  projectId: "e-totur",
  storageBucket: "e-totur.appspot.com",
  messagingSenderId: "823325856188",
  appId: "1:823325856188:web:01a85ac552ea43ed7d5bb9",
  measurementId: "G-53QZWNPDG2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('firebase initialize app')
