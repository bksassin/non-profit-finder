// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxlVHfG7HXHEHXMAy8OzEQD-BFt_dmIxA",
  authDomain: "nonprofit-finder.firebaseapp.com",
  projectId: "nonprofit-finder",
  storageBucket: "nonprofit-finder.firebasestorage.app",
  messagingSenderId: "156623347207",
  appId: "1:156623347207:web:77ff5ccce7c722a62c94a2",
  measurementId: "G-D9B6FR6CLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);