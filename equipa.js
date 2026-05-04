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
  // ✅ PROTEÇÃO OBRIGATÓRIA
  if (!estado) {
    console.warn("estadoGlobal ainda não existe");
    return;
  }

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

  const correta = resposta === "A";

  let impactoPN = correta ? 10 : -10;
  let impactoPC = correta ? 5 : -5;

  if (risco === "2") {
    impactoPN *= 2;
    impactoPC *= 2;
  }

  if (risco === "all") {
    impactoPN = correta ? 20 : -20;
    impactoPC = correta ? 20 : -20;
  }

  // 🔑 LER ESTADO ATUAL DA EQUIPA ANTES DE ESCREVER
  ouvirEquipa((equipa) => {
    if (!equipa) return;

    atualizarEquipa({
      pontosNegocio: equipa.pontosNegocio + impactoPN,
      pontosCliente: equipa.pontosCliente + impactoPC,
      respondeuNestaRonda: true
    });
  });
}

