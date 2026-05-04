// base.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

/* ===========================
   CONFIGURAÇÃO FIREBASE
=========================== */

const firebaseConfig = {
  apiKey: "A_TUA_API_KEY",
  authDomain: "TEU_PROJETO.firebaseapp.com",
  databaseURL: "https://TEU_PROJETO-default-rtdb.firebaseio.com",
  projectId: "TEU_PROJETO"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ===========================
   ESTADO GLOBAL
=========================== */

export function inicializarEstadoGlobal() {
  const estadoRef = ref(db, "estadoGlobal");

  get(estadoRef).then(snapshot => {
    if (!snapshot.exists()) {
      set(estadoRef, {
        rondaAtual: 0,
        estadoRonda: "fechada",
        totalRondas: 6,
        perguntaAtual: 0
      });
    }
  });
}

export function ouvirEstadoGlobal(callback) {
  onValue(ref(db, "estadoGlobal"), snapshot => {
    callback(snapshot.val());
  });
}

export function atualizarEstadoGlobal(dados) {
  update(ref(db, "estadoGlobal"), dados);
}

/* ===========================
   EQUIPAS
=========================== */

export function registarEquipa(nomeEquipa) {
  const equipasRef = ref(db, "equipas");
  const novaEquipa = push(equipasRef);

  set(novaEquipa, {
    nome: nomeEquipa,
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
  update(ref(db, `equipas/${equipaId}`), dados);
}

export function ouvirTodasEquipas(callback) {
  onValue(ref(db, "equipas"), snapshot => {
    callback(snapshot.val());
  });
}