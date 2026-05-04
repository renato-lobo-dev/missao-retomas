// base.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  push,
  get
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


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



export async function inicializarEstadoGlobal() {
  const snapshot = await get(ref(db, "estadoGlobal"));

  if (!snapshot.exists()) {
    await set(ref(db, "estadoGlobal"), {
      estadoRonda: "fechada",
      perguntaAtual: 0,
      rondaAtual: 0,
      totalRondas: 7
    });
  }
}




export function resetEstadoGlobal() {
  return set(ref(db, "estadoGlobal"), {
    estadoRonda: "fechada",
    perguntaAtual: 0,
    rondaAtual: 0,
    totalRondas: 7
  });
}



export function ouvirEstadoGlobal(callback) {
  onValue(ref(db, "estadoGlobal"), snapshot => {
    callback(snapshot.val());
  });
}


export function atualizarEstadoGlobal(dados) {
  return update(ref(db, "estadoGlobal"), dados);
}


export function registarEquipa(nome) {
  const novaEquipa = push(ref(db, "equipas"));

  set(novaEquipa, {
    nome,
    pontosNegocio: 100,
    pontosCliente: 100,
    respondeuNestaRonda: false
  });

  localStorage.setItem("equipaId", novaEquipa.key);
}


export function ouvirEquipa(callback) {
  const equipaId = localStorage.getItem("equipaId");
  if (!equipaId) return;

  onValue(ref(db, `equipas/${equipaId}`), snapshot => {
    callback(snapshot.val());
  });
}


export function atualizarEquipa(dados) {
  const equipaId = localStorage.getItem("equipaId");
  if (!equipaId) return;

  return update(ref(db, `equipas/${equipaId}`), dados);
}


export function ouvirTodasEquipas(callback) {
  onValue(ref(db, "equipas"), snapshot => {
    callback(snapshot.val());
  });
}


export {
  db,
  ref,
  get,
  set
};
