// formador.js
import {
  db,
  ref,
  get,
  inicializarEstadoGlobal,
  atualizarEstadoGlobal,
  ouvirEstadoGlobal,
  ouvirTodasEquipas
} from "./base.js";

import { perguntas } from "./perguntas.js";

/* ===========================
   INICIALIZAÇÃO
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Formador carregado");

  // Garante que o estado existe (sem sobrescrever)
  inicializarEstadoGlobal();

  // Listeners reativos (APENAS UI)
  ouvirEstadoGlobal(atualizarEstadoUI);
  ouvirTodasEquipas(atualizarPlacar);

  // Botões
  ligarBotao("abrirRonda", abrirRonda);
  ligarBotao("fecharPergunta", fecharPergunta);
  ligarBotao("proximaPergunta", proximaPergunta);
  ligarBotao("resetJogo", resetJogo);
});

/* ===========================
   HELPERS
=========================== */

function ligarBotao(id, handler) {
  const btn = document.getElementById(id);
  if (!btn) {
    console.warn(`Botão ${id} não encontrado`);
    return;
  }
  btn.addEventListener("click", handler);
}

/* ===========================
   AÇÕES DO FORMADOR
=========================== */

function abrirRonda() {
  atualizarEstadoGlobal({ estadoRonda: "aberta" });
}

async function fecharPergunta() {
  const snapshot = await get(ref(db, "estadoGlobal"));
  const estado = snapshot.val();
  if (!estado) return;

  const perguntaObj = perguntas[estado.perguntaAtual];
  if (!perguntaObj) return;

  // Fechar ronda
  atualizarEstadoGlobal({ estadoRonda: "fechada" });

  // Mostrar solução
  document.getElementById("respostaCorreta").textContent =
    perguntaObj.correta + " — " + perguntaObj.opcoes[perguntaObj.correta];

  document.getElementById("explicacaoResposta").textContent =
    perguntaObj.explicacao;

  document.getElementById("solucao").classList.remove("hidden");
}

async function proximaPergunta() {
  const snapshot = await get(ref(db, "estadoGlobal"));
  const estado = snapshot.val();
  if (!estado) return;

  if (estado.perguntaAtual >= estado.totalRondas - 1) {
    alert("O jogo terminou.");
    atualizarEstadoGlobal({ estadoRonda: "fechada" });
    return;
  }

  atualizarEstadoGlobal({
    perguntaAtual: estado.perguntaAtual + 1,
    estadoRonda: "fechada"
  });
}

async function resetJogo() {
  console.log("RESET JOGO");

  // 1. Reset estado global
  await set(ref(db, "estadoGlobal"), {
    estadoRonda: "fechada",
    perguntaAtual: 0,
    rondaAtual: 0,
    totalRondas: perguntas.length
  });

  // 2. APAGAR TODAS AS EQUIPAS
  await set(ref(db, "equipas"), null);

  alert("Jogo reiniciado. As equipas podem voltar a entrar.");
}

/* ===========================
   UI – ESTADO GLOBAL
=========================== */

function atualizarEstadoUI(estado) {
  if (!estado) return;

  const perguntaObj = perguntas[estado.perguntaAtual];
  if (!perguntaObj) return;

  // Mostrar pergunta atual
  document.getElementById("perguntaAtualTexto").textContent =
    perguntaObj.pergunta;

  // Esconder solução sempre que muda estado/pergunta
  document.getElementById("solucao").classList.add("hidden");
}

/* ===========================
   UI – PLACAR
=========================== */

function atualizarPlacar(equipas) {
  const container = document.getElementById("equipas");
  container.innerHTML = "";
  if (!equipas) return;

  const listaOrdenada = Object.values(equipas)
    .map(eq => {
      const notaFinal =
        (eq.pontosCliente * 0.7) +
        (eq.pontosNegocio * 0.3);

      return {
        ...eq,
        _notaFinal: notaFinal // campo interno, não exibido
      };
    })
    .sort((a, b) => b._notaFinal - a._notaFinal);

  listaOrdenada.forEach(eq => {
    const div = document.createElement("div");
    div.className = "team";

    div.innerHTML = `
      <strong>${eq.nome}</strong><br>
      🙂 Cliente: ${eq.pontosCliente}<br>
      💰 Negócio: ${eq.pontosNegocio}
    `;

    container.appendChild(div);
  });
}
