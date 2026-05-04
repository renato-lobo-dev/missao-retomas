// equipa.js
import {
  ouvirEstadoGlobal,
  ouvirEquipa,
  atualizarEquipa
} from "./base.js";

import { perguntas } from "./perguntas.js";

/* ===========================
   ESTADO LOCAL
=========================== */

let respostaSelecionada = null;
let riscoSelecionado = null;

/* ===========================
   INICIALIZAÇÃO
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  ouvirEstadoGlobal(atualizarRonda);
  ouvirEquipa(atualizarEquipaUI);
  prepararEventos();
});

/* ===========================
   UI – RONDA
=========================== */

function atualizarRonda(estado) {
  // ✅ proteção obrigatória
  if (!estado) {
    console.warn("estadoGlobal ainda não disponível");
    return;
  }

  const statusEl = document.getElementById("roundStatus");
  const perguntaEl = document.getElementById("pergunta");
  const confirmarBtn = document.getElementById("confirmar");

  if (estado.estadoRonda !== "aberta") {
    statusEl.textContent = "A aguardar próxima ronda…";
    perguntaEl.textContent = "";
    confirmarBtn.disabled = true;
    limparSelecoes();
    return;
  }

  // ✅ ronda aberta
  statusEl.textContent = "Ronda ativa";

  const perguntaAtual = perguntas[estado.perguntaAtual];
  if (!perguntaAtual) {
    perguntaEl.textContent = "Fim do jogo";
    confirmarBtn.disabled = true;
    return;
  }

  perguntaEl.textContent = perguntaAtual.pergunta;

  // atualizar texto das opções
  document.querySelectorAll(".options button").forEach(btn => {
    const key = btn.dataset.opcao;
    btn.textContent = perguntaAtual.opcoes[key];
  });

  confirmarBtn.disabled = false;
  limparSelecoes();
}

/* ===========================
   UI – EQUIPA
=========================== */

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
    btn.addEventListener("click", () => {
      respostaSelecionada = btn.dataset.opcao;
      destacarSelecao(".options button", btn);
    });
  });

  document.querySelectorAll(".risk button").forEach(btn => {
    btn.addEventListener("click", () => {
      riscoSelecionado = btn.dataset.risco;
      destacarSelecao(".risk button", btn);
    });
  });

  document.getElementById("confirmar")
    .addEventListener("click", confirmarResposta);
}

function destacarSelecao(selector, elemento) {
  document.querySelectorAll(selector).forEach(b => {
    b.style.opacity = "0.5";
  });
  elemento.style.opacity = "1";
}

function limparSelecoes() {
  respostaSelecionada = null;
  riscoSelecionado = null;

  document.querySelectorAll(".options button, .risk button").forEach(b => {
    b.style.opacity = "1";
  });
}

/* ===========================
   LÓGICA DO JOGO
=========================== */

import { get, ref } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";
import { db } from "./base.js";

function confirmarResposta() {
  if (!respostaSelecionada || !riscoSelecionado) {
    alert("Escolhe uma opção e um nível de risco.");
    return;
  }

  // bloqueio local para impedir duplo clique
  document.getElementById("confirmar").disabled = true;

  // obter estado global UMA VEZ
  get(ref(db, "estadoGlobal")).then(snapshotEstado => {
    const estado = snapshotEstado.val();
    if (!estado || estado.estadoRonda !== "aberta") return;

    const perguntaAtual = perguntas[estado.perguntaAtual];
    if (!perguntaAtual) return;

    const correta = respostaSelecionada === perguntaAtual.correta;

    let impactoPN = correta
      ? perguntaAtual.impacto.correta.pn
      : perguntaAtual.impacto.errada.pn;
    let impactoPC = correta
      ? perguntaAtual.impacto.correta.pc
      : perguntaAtual.impacto.errada.pc;

    // aplicar risco
    if (riscoSelecionado === "2") {
      impactoPN *= 2;
      impactoPC *= 2;
    }
    if (riscoSelecionado === "all") {
      impactoPN = correta ? 20 : -20;
      impactoPC = correta ? 20 : -20;
    }

    // obter equipa UMA VEZ
    const equipaId = localStorage.getItem("equipaId");
    if (!equipaId) return;

    get(ref(db, `equipas/${equipaId}`)).then(snapshotEquipa => {
      const equipa = snapshotEquipa.val();
      if (!equipa || equipa.respondeuNestaRonda) return;

      atualizarEquipa({
        pontosNegocio: equipa.pontosNegocio + impactoPN,
        pontosCliente: equipa.pontosCliente + impactoPC,
        respondeuNestaRonda: true
      });
    });
  });
}
