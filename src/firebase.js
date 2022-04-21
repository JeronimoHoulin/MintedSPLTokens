import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { initializeApp} from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

console.log(process.env)

const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey,
  authDomain:process.env.REACT_APP_authDomain,
  databaseURL:process.env.REACT_APP_databaseURL,
  projectId:process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId:process.env.REACT_APP_appId,
  measurementId:process.env.REACT_APP_measurementId
};
/*
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
*/

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)