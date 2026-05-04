// formador.js
import {
  inicializarEstadoGlobal,
  ouvirEstadoGlobal,
  atualizarEstadoGlobal,
  ouvirTodasEquipas
} from "./base.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Formador.js carregado");

  inicializarEstadoGlobal();

  ouvirEstadoGlobal(atualizarEstadoUI);
  ouvirTodasEquipas(atualizarListaEquipas);

  document.getElementById("abrirRonda").addEventListener("click", () => {
    atualizarEstadoGlobal({ estadoRonda: "aberta" });
  });

  document.getElementById("fecharRonda").addEventListener("click", () => {
    atualizarEstadoGlobal({ estadoRonda: "fechada" });
  });
});

/* ===========================
   UI – ESTADO GLOBAL
=========================== */

function atualizarEstadoUI(estado) {
  const el = document.getElementById("perguntaAtual");
  el.textContent =
    `Ronda ${estado.rondaAtual + 1} / ${estado.totalRondas} — ` +
    (estado.estadoRonda === "aberta" ? "ABERTA" : "FECHADA");
}

/* ===========================
   UI – EQUIPAS
=========================== */

function atualizarListaEquipas(equipas) {
  const container = document.getElementById("equipas");
  container.innerHTML = "";

  if (!equipas) {
    container.innerHTML = "<p>Sem equipas registadas</p>";
    return;
  }

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
