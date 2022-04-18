import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { initializeApp} from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey:"AIzaSyCRk65ziWg9hhMu7vho4JpHMe1pga1eoIA",
  authDomain:"jerotesteo1.firebaseapp.com",
  databaseURL:"https://jerotesteo1-default-rtdb.firebaseio.com",
  projectId: "jerotesteo1",
  storageBucket: "jerotesteo1.appspot.com",
  messagingSenderId: "285230177474",
  appId: "1:285230177474:web:b52f871e8692145f49ef5b",
  measurementId: "G-T8BDRVR7RQ"
};
/*
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
*/

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)