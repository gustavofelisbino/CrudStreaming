import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmr-qcGcoy8WfI_ju9wJuV3zUhPaowJ98",
  authDomain: "projetostreamingcrud.firebaseapp.com",
  projectId: "projetostreamingcrud",
  storageBucket: "projetostreamingcrud.appspot.com",
  messagingSenderId: "231696302107",
  appId: "1:231696302107:web:4345600a55ebfcc427f8be"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
