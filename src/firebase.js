import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Your NEW Firebase project config:
const firebaseConfig = {
  apiKey: "AIzaSyCEgyoKPnrRwbkwcxmTLrg6SA8ko-i7tHw",
  authDomain: "portfolioproject-f749f.firebaseapp.com",
  projectId: "portfolioproject-f749f",
  storageBucket: "portfolioproject-f749f.appspot.com",
  messagingSenderId: "142801445063",
  appId: "1:142801445063:web:896f97baffdf0ddd079ee2",
  measurementId: "G-QF1TS8F4TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
