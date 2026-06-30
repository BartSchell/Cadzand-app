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
