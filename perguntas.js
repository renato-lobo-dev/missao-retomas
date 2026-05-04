export const perguntas = [

  {
    id: 1,
    tipo: "regra",
    pergunta: "Um cliente traz um iPhone 11 para retoma. O que fazes?",
    opcoes: {
      A: "Aceitas a retoma normalmente",
      B: "Explicas que o modelo já não é elegível",
      C: "Aceitas mas com valor simbólico",
      D: "Informas que infelizmente já não retomamos esse equipamento, mas que estamos disponiveis para analisar outros equipamentos no futuro"
    },
    correta: "D",
    explicacao: "O iPhone 11 já não é elegível para retoma. É fundamental explicar o motivo,redirecionar a conversa para uma alternativa de venda e mostrar disponbilidade ao cliente.",
    impacto: {
      correta: { pn: +10, pc: 0 },
      errada:  { pn: -15, pc: -10 }
    }
  },

  {
    id: 2,
    tipo: "cliente",
    pergunta: "O cliente diz que lhe foi dado outro valor de retoma na semana passada. Como respondes?",
    opcoes: {
      A: "Aceitas o valor antigo",
      B: "Explicas a volatilidade e validade diária, mostrando disponbilidade para fazer a retoma na mesma",
      C: "Recusas sem justificar"
    },
    correta: "B",
    explicacao: "É importante informar o cliente do motivo da não aceitação do equipamento do valor antigo, mostrando-nos sempre disponiveis para a conclusão do processo pelo valor no sistema hoje. Que pode não ser o mesmo amanhã. ",
    impacto: {
      correta: { pn: +10, pc: +5 },
      errada:  { pn: -15, pc: -15 }
    }
  },

  {
    id: 3,
    tipo: "tecnico",
    pergunta: "Um iPhone com uma pequena mossa no canto do equipamento,tampa traseira partida,mas completamente funcional, deve ser classificado como:",
    opcoes: {
      A: "Grade D",
      B: "Grade B",
      C: "Grade C"
    },
    correta: "A",
    explicacao: "Um equipamento com algo dano físico é sempre um GRADE D, apenas recusamos equipamentos com humidade e com o corpo dobrado.",
    impacto: {
      correta: { pn: +10, pc: +5 },
      errada:  { pn: -10, pc: -10 }
    }
  },

  {
    id: 4,
    tipo: "regra",
    pergunta: "Um equipamento sem marcação CE pode ser aceite em retoma?",
    opcoes: {
      A: "Sim, desde que funcione",
      B: "Sim, mas com valor reduzido",
      C: "Não pode ser aceite e explicamos o motivo da impossibilidade"
    },
    correta: "C",
    explicacao: "A marcação CE é extremamente importante e não pode ser ignorada. Devemos sempre ter o cuidado de explicar ao cliente o motivo para não o afastar de uma possivel retoma no futuro...com a marcação CE.",
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
    explicacao: "Mostrar ao cliente que compreendemos, mas que é o mercado da oferta e da procura, e que no que vai ter um retorno financeiro pelo equipamento o que vai aliviar o custo da nova aquisição.",
    impacto: {
      correta: { pn: +5, pc: +15 },
      errada:  { pn: -5, pc: -20 }
    }
  },

  {
    id: 6,
    tipo: "comercial",
    pergunta: "Que oportunidade(s) comercial surge com a retoma?",
    opcoes: {
      A: "Apenas venda do novo equipamento",
      B: "Upgrade + serviços adicionais",
      C: "Nenhuma vantagem adicional"
    },
    correta: "B",
    explicacao: "A retoma do equipamento do cliente vai permitir ao cliente fazer um upgrade à compra que vai fazer bem como adquirir serviços adicionais como Plano de Proteção/Capa/Pelicula/Carregador...etc",
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
      B: "Aumentar vendas, fidelizar os cliente e dar uma segunda vida aos equipamentos dos mesmos",
      C: "Nenhum"
    },
    correta: "B",
    explicacao: "Ao colocar dinheiro no bolso do cliente estamos a criar potenciais clientes, a fidelizá-los para a retoma connosco no próximo lançamento e ao mesmo tempo alimentar dar uma segunda vida aos seus equipamentos para venda nas nossas lojas.",
    impacto: {
      correta: { pn: +10, pc: +10 },
      errada:  { pn: 0, pc: -10 }
    }
  }

];
