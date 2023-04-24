import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNcbX2z0U--koS48Seu2-DR5z2_3FBjVo",
  authDomain: "finance-duo.firebaseapp.com",
  databaseURL:
    "https://finance-duo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finance-duo",
  storageBucket: "finance-duo.appspot.com",
  messagingSenderId: "981324207809",
  appId: "1:981324207809:web:428fd77741b1779ed2a640",
  measurementId: "G-GS1JMF59F6",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();
const database = getDatabase();

export { auth, db, database };
