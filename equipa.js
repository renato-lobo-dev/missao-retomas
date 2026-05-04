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

function confirmarResposta() {
  if (!respostaSelecionada || !riscoSelecionado) {
    alert("Escolhe uma opção e um nível de risco.");
    return;
  }

  ouvirEstadoGlobal((estado) => {
    if (!estado || estado.estadoRonda !== "aberta") return;

    const perguntaAtual = perguntas[estado.perguntaAtual];
    if (!perguntaAtual) return;

    const correta = respostaSelecionada === perguntaAtual.correta;
    let impacto = correta
      ? { ...perguntaAtual.impacto.correta }
      : { ...perguntaAtual.impacto.errada };

    // aplicar risco
    if (riscoSelecionado === "2") {
      impacto.pn *= 2;
      impacto.pc *= 2;
    }

    if (riscoSelecionado === "all") {
      impacto.pn = correta ? 20 : -20;
      impacto.pc = correta ? 20 : -20;
    }

    // 🔑 somar aos pontos atuais
    ouvirEquipa((equipa) => {
      if (!equipa) return;

      atualizarEquipa({
        pontosNegocio: equipa.pontosNegocio + impacto.pn,
        pontosCliente: equipa.pontosCliente + impacto.pc,
        respondeuNestaRonda: true
      });
    });
  });
}
