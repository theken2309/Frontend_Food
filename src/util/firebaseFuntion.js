import {doc,setDoc} from 'firebase/firestore';
  import { firestore } from '../firebaseconnect';
  
  export const saveItem = async data => {
    await setDoc(
        doc(firestore, 'foodItems', `${Date.now()}`), data, {merge: true,}
        );
  };