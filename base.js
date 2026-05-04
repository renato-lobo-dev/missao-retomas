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

// ✅ inicialização única
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ===========================
   ESTADO GLOBAL
=========================== */

export function atualizarEstadoGlobal(dados) {
  return update(ref(db, "estadoGlobal"), dados);
}

export function ouvirEstadoGlobal(callback) {
  onValue(ref(db, "estadoGlobal"), snap => callback(snap.val()));
}


export function inicializarEstadoGlobal() {
  set(ref(db, "estadoGlobal"), {
    estadoRonda: "fechada",
    rondaAtual: 0,
    totalRondas: 6,
    perguntaAtual: 0
  });
}


/* ===========================
   EQUIPAS
=========================== */
export function registarEquipa(nome) {
  const nova = push(ref(db, "equipas"));
  set(nova, {
    nome,
    pontosNegocio: 100,
    pontosCliente: 100,
    respondeuNestaRonda: false
  });
  localStorage.setItem("equipaId", nova.key);
}

export function ouvirEquipa(callback) {
  const id = localStorage.getItem("equipaId");
  if (!id) return;
  onValue(ref(db, `equipas/${id}`), snap => callback(snap.val()));
}

/* ✅ ESTA FUNÇÃO FALTAVA */
export function atualizarEquipa(dados) {
  const id = localStorage.getItem("equipaId");
  if (!id) return;
  update(ref(db, `equipas/${id}`), dados);
}

export function ouvirTodasEquipas(callback) {
  onValue(ref(db, "equipas"), snap => callback(snap.val()));
}

