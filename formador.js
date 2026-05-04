// formador.js
import {
  inicializarEstadoGlobal,
  ouvirEstadoGlobal,
  atualizarEstadoGlobal,
  ouvirTodasEquipas
} from "./base.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarEstadoGlobal();
  ouvirEstadoGlobal(atualizarUI);
  ouvirTodasEquipas(atualizarEquipas);

  document.getElementById("abrirRonda").onclick = abrirRonda;
  document.getElementById("fecharRonda").onclick = fecharRonda;
});

/* ===========================
   CONTROLO
=========================== */

function abrirRonda() {
  atualizarEstadoGlobal({
    estadoRonda: "aberta"
  });
}

function fecharRonda() {
  atualizarEstadoGlobal({
    estadoRonda: "fechada",
    rondaAtual: incrementRonda,
    perguntaAtual: incrementPergunta
  });
}

function incrementRonda(prev) {
  return prev + 1;
}

function incrementPergunta(prev) {
  return prev + 1;
}

/* ===========================
   UI
=========================== */

function atualizarUI(estado) {
  document.getElementById("perguntaAtual").textContent =
    `Ronda ${estado.rondaAtual + 1} / ${estado.totalRondas}`;
}

function atualizarEquipas(equipas) {
  const container = document.getElementById("equipas");
  container.innerHTML = "";

  if (!equipas) return;

  Object.values(equipas).forEach(eq => {
    const div = document.createElement("div");
    div.className = "team";
    div.innerHTML = `
      <strong>${eq.nome}</strong>
      💰 Negócio: ${eq.pontosNegocio}<br>
      🙂 Cliente: ${eq.pontosCliente}
    `;
    container.appendChild(div);
  });
}