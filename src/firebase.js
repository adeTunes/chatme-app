import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBD9TAFaAppWsFGX85ZeH9mVcfkg7ejaBQ",
    authDomain: "chat-a3ac1.firebaseapp.com",
    projectId: "chat-a3ac1",
    storageBucket: "chat-a3ac1.appspot.com",
    messagingSenderId: "977036874571",
    appId: "1:977036874571:web:7034e11fd6489eee71cece",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
