// Bart: paste your own Firebase project's config below.
// You get this from the Firebase Console -> Project Settings -> General -> "Your apps" -> SDK setup snippet.
// See README.md for the full step-by-step.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_oMEnIHNcCN1yJWYmE0v8rnshwsN5D-4",
  authDomain: "cadzand-huisje.firebaseapp.com",
  projectId: "cadzand-huisje",
  storageBucket: "cadzand-huisje.firebasestorage.app",
  messagingSenderId: "534633852485",
  appId: "1:534633852485:web:3daf74831058a61df63d2c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
