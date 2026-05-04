// base.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6cooQbT-S1rxjzLX-NpXdilNBL-VT-Yg",
  authDomain: "missao-retomas.firebaseapp.com",
  databaseURL: "https://missao-retomas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "missao-retomas",
  storageBucket: "missao-retomas.appspot.com",
  messagingSenderId: "3061563198",
  appId: "1:3061563198:web:439a5e147aca6192b9f66f"
};

// ✅ ÚNICA inicialização
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, update, onValue, push };
