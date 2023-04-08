import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCewTGN4fYpWFVQtWcn9Tf6A2yKWARnTRE",
  authDomain: "otp-firebase-13ec1.firebaseapp.com",
  projectId: "otp-firebase-13ec1",
  storageBucket: "otp-firebase-13ec1.appspot.com",
  messagingSenderId: "1031950571098",
  appId: "1:1031950571098:web:684efbf5ff2a39ecd66a63"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);