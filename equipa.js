// equipa.js
import {
  ouvirEstadoGlobal,
  ouvirEquipa,
  atualizarEquipa,
  db,
  ref,
  get
} from "./base.js";

import { perguntas } from "./perguntas.js";

/* ===========================
   ESTADO LOCAL
=========================== */

let respostaSelecionada = null;
let riscoSelecionado = null;
let interacaoBloqueada = false;

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
  if (!estado) return;

  const statusEl = document.getElementById("roundStatus");
  const perguntaEl = document.getElementById("pergunta");
  const confirmarBtn = document.getElementById("confirmar");

  // RONDA FECHADA
  if (estado.estadoRonda !== "aberta") {
    statusEl.textContent = "A aguardar próxima ronda…";
    perguntaEl.textContent = "";
    confirmarBtn.disabled = true;
    bloquearInteracao();
    return;
  }

  // RONDA ABERTA
  const perguntaAtual = perguntas[estado.perguntaAtual];
  if (!perguntaAtual) {
    perguntaEl.textContent = "Fim do jogo";
    confirmarBtn.disabled = true;
    bloquearInteracao();
    return;
  }

  statusEl.textContent = "Ronda ativa";
  perguntaEl.textContent = perguntaAtual.pergunta;

  // Atualizar opções
  document.querySelectorAll(".options button").forEach(btn => {
    const key = btn.dataset.opcao;
    btn.textContent = perguntaAtual.opcoes[key];
  });

  desbloquearInteracao();
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
      if (interacaoBloqueada) return;
      respostaSelecionada = btn.dataset.opcao;
      destacarSelecao(".options button", btn);
    });
  });

  document.querySelectorAll(".risk button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (interacaoBloqueada) return;
      riscoSelecionado = btn.dataset.risco;
      destacarSelecao(".risk button", btn);
    });
  });

  document
    .getElementById("confirmar")
    .addEventListener("click", confirmarResposta);
}

function destacarSelecao(selector, ativo) {
  document.querySelectorAll(selector).forEach(b => {
    b.style.opacity = "0.4";
  });
  ativo.style.opacity = "1";
}

/* ===========================
   BLOQUEIO / DESBLOQUEIO
=========================== */

function bloquearInteracao() {
  interacaoBloqueada = true;

  document
    .querySelectorAll(".options button, .risk button")
    .forEach(btn => btn.disabled = true);

  const confirmarBtn = document.getElementById("confirmar");
  confirmarBtn.disabled = true;
  confirmarBtn.textContent = "Resposta submetida";

  document.getElementById("roundStatus").textContent =
    "Resposta submetida. Aguarde…";
}

function desbloquearInteracao() {
  interacaoBloqueada = false;
  respostaSelecionada = null;
  riscoSelecionado = null;

  document
    .querySelectorAll(".options button, .risk button")
    .forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = "1";
    });

  const confirmarBtn = document.getElementById("confirmar");
  confirmarBtn.disabled = false;
  confirmarBtn.textContent = "Confirmar decisão";
}

/* ===========================
   CONFIRMAÇÃO DA RESPOSTA
=========================== */

async function confirmarResposta() {
  if (interacaoBloqueada) return;

  if (!respostaSelecionada || !riscoSelecionado) {
    alert("Escolhe uma opção e um nível de risco.");
    return;
  }

  bloquearInteracao();

  // Ler estado global UMA VEZ
  const snapshotEstado = await get(ref(db, "estadoGlobal"));
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

  // Aplicar risco
  if (riscoSelecionado === "2") {
    impactoPN *= 2;
    impactoPC *= 2;
  }

  if (riscoSelecionado === "all") {
    impactoPN = correta ? 20 : -20;
    impactoPC = correta ? 20 : -20;
  }

  // Ler equipa UMA VEZ
  const equipaId = localStorage.getItem("equipaId");
  if (!equipaId) return;

  const snapshotEquipa = await get(ref(db, `equipas/${equipaId}`));
  const equipa = snapshotEquipa.val();
  if (!equipa) return;

  await atualizarEquipa({
    pontosNegocio: equipa.pontosNegocio + impactoPN,
    pontosCliente: equipa.pontosCliente + impactoPC,
    respondeuNestaRonda: true
  });
}