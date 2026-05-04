// index.js
console.log("INDEX.JS A EXECUTAR");

import { registarEquipa, inicializarEstadoGlobal } from "./base.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("entrarBtn");

  btn.addEventListener("click", () => {
    const nome = document.getElementById("teamName").value.trim();

    if (!nome) {
      alert("Por favor, insere o nome da equipa.");
      return;
    }

    // garante que o estado global existe
    inicializarEstadoGlobal();

    // cria equipa no Firebase
    
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


    // vai para a página da equipa
    window.location.href = "equipa.html";
  });
});
