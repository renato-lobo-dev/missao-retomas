// equipa.js

import {
  ouvirEstadoGlobal,
  ouvirEquipa,
  atualizarEquipa
} from "./base.js";


let resposta = null;
let risco = null;
let estadoGlobalAtual = null;

document.addEventListener("DOMContentLoaded", () => {
  ouvirEstadoGlobal(atualizarRonda);
  ouvirEquipa(atualizarEquipaUI);

  prepararEventos();
});

/* ===========================
   UI
=========================== */

function atualizarRonda(estado) {
  estadoGlobalAtual = estado;

  const status = document.getElementById("roundStatus");
  const pergunta = document.getElementById("pergunta");
  const confirmar = document.getElementById("confirmar");

  if (estado.estadoRonda !== "aberta") {
    status.textContent = "A aguardar próxima ronda…";
    pergunta.textContent = "";
    confirmar.disabled = true;
  } else {
    status.textContent = "Ronda ativa";
    pergunta.textContent = `Pergunta ${estado.perguntaAtual + 1}`;
    confirmar.disabled = false;
  }
}

function atualizarEquipaUI(equipa) {
  if (!equipa) return;

  document.getElementById("teamName").textContent = equipa.nome;
  document.getElementById("pontosNegocio").textContent = equipa.pontosNegocio;
  document.getElementById("pontosCliente").textContent = equipa.pontosCliente;
}

/* ===========================
   EVENTOS
=========================== */

function prepararEventos() {
  document.querySelectorAll(".options button").forEach(btn => {
    btn.onclick = () => resposta = btn.dataset.opcao;
  });

  document.querySelectorAll(".risk button").forEach(btn => {
    btn.onclick = () => risco = btn.dataset.risco;
  });

  document.getElementById("confirmar").onclick = confirmarResposta;
}

/* ===========================
   JOGO
=========================== */

function confirmarResposta() {
  if (!resposta || !risco) {
    alert("Escolhe resposta e risco.");
    return;
  }

  // SIMULA resposta correta (ligamos às perguntas depois)
  const correta = resposta === "A";

  let pn = correta ? 10 : -10;
  let pc = correta ? 5 : -5;

  if (risco === "2") {
    pn *= 2;
    pc *= 2;
  }

  if (risco === "all") {
    pn = correta ? 20 : -20;
    pc = correta ? 20 : -20;
  }

  atualizarEquipa({
    pontosNegocio: pn,
    pontosCliente: pc,
    respondeuNestaRonda: true
  });
}
