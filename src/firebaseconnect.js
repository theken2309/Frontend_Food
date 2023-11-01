import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBPlhlxeoWi2a3PHAIHW25S0NI-5N7CtrE",
    authDomain: "luyentap110.firebaseapp.com",
    databaseURL: "https://luyentap110-default-rtdb.firebaseio.com",
    projectId: "luyentap110",
    storageBucket: "luyentap110.appspot.com",
    messagingSenderId: "958272121019",
    appId: "1:958272121019:web:17c0a0b7a567b86e15a19e",
    measurementId: "G-K0QV2E43R8"
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  export { app, firestore, storage };


