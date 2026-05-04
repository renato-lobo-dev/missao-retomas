export const perguntas = [

  {
    id: 1,
    tipo: "regra",
    pergunta: "Um cliente traz um iPhone 11 para retoma. O que fazes?",
    opcoes: {
      A: "Aceitas a retoma normalmente",
      B: "Explicas que o modelo já não é elegível",
      C: "Aceitas mas com valor simbólico"
    },
    correta: "B",
    impacto: {
      correta: { pn: +10, pc: -5 },
      errada:  { pn: -15, pc: -10 }
    }
  },

  {
    id: 2,
    tipo: "cliente",
    pergunta: "O cliente diz que lhe foi dado outro valor de retoma na semana passada. Como respondes?",
    opcoes: {
      A: "Aceitas o valor antigo",
      B: "Explicas a volatilidade e validade diária",
      C: "Recusas sem justificar"
    },
    correta: "B",
    impacto: {
      correta: { pn: +10, pc: +10 },
      errada:  { pn: -15, pc: -15 }
    }
  },

  {
    id: 3,
    tipo: "tecnico",
    pergunta: "Um iPhone com riscos visíveis no ecrã, mas funcional, deve ser classificado como:",
    opcoes: {
      A: "Grade A",
      B: "Grade B",
      C: "Grade C"
    },
    correta: "C",
    impacto: {
      correta: { pn: +10, pc: +5 },
      errada:  { pn: -10, pc: -5 }
    }
  },

  {
    id: 4,
    tipo: "regra",
    pergunta: "Um equipamento sem marcação CE pode ser aceite em retoma?",
    opcoes: {
      A: "Sim, desde que funcione",
      B: "Sim, mas com valor reduzido",
      C: "Não pode ser aceite"
    },
    correta: "C",
    impacto: {
      correta: { pn: +10, pc: 0 },
      errada:  { pn: -20, pc: -5 }
    }
  },

  {
    id: 5,
    tipo: "cliente",
    pergunta: "O cliente fica frustrado ao saber que o valor é baixo. Qual a melhor abordagem?",
    opcoes: {
      A: "Manteres o discurso técnico",
      B: "Validar a frustração e redirecionar a vantagem",
      C: "Encerrar rapidamente a conversa"
    },
    correta: "B",
    impacto: {
      correta: { pn: +5, pc: +15 },
      errada:  { pn: -5, pc: -20 }
    }
  },

  {
    id: 6,
    tipo: "comercial",
    pergunta: "Que oportunidade comercial surge com a retoma?",
    opcoes: {
      A: "Apenas venda do novo equipamento",
      B: "Upgrade + serviços adicionais",
      C: "Nenhuma vantagem adicional"
    },
    correta: "B",
    impacto: {
      correta: { pn: +15, pc: +5 },
      errada:  { pn: -5, pc: -5 }
    }
  },

  {
    id: 7,
    tipo: "reflexao",
    pergunta: "Qual é o verdadeiro objetivo do serviço de retomas?",
    opcoes: {
      A: "Aumentar stock usado",
      B: "Aumentar vendas e fidelização",
      C: "Eliminar equipamentos antigos"
    },
    correta: "B",
    impacto: {
      correta: { pn: +10, pc: +10 },
      errada:  { pn: 0, pc: -10 }
    }
  }

];
