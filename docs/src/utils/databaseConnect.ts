import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = initializeApp({
  apiKey: "AIzaSyCvCopqF59sgWAVVwEssFSqLpLz_IyGKo0",
  authDomain: "garbagetruck-6051f.firebaseapp.com",
  projectId: "garbagetruck-6051f",
  storageBucket: "garbagetruck-6051f.appspot.com",
  messagingSenderId: "678536957254",
  appId: "1:678536957254:web:bfdabb7ca699b993782947",
});

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
