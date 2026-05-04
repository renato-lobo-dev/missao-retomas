// index.js
console.log("INDEX.JS A EXECUTAR");


import { registarEquipa } from "./base.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("entrarBtn").addEventListener("click", () => {
    const nome = document.getElementById("teamName").value.trim();
    if (!nome) {
      alert("Insere o nome da equipa.");
      return;
    }

    registarEquipa(nome); // push + set
    window.location.href = "equipa.html";
  });
});

