// =============================================
// Estruturas condicionais — exercícios de prática
// Trilha QA Automação
// =============================================
// Organize seus exercícios em blocos separados por comentários.
// Para rodar tudo de uma vez: node fundamentos/estruturas-condicionais.js
// (ajuste o caminho conforme a pasta onde você salvou o arquivo)

console.log("=== Início dos exercícios: estruturas condicionais ===\n");

// ---------------------------------------------
// Exercício 1 — Validar status code de sucesso
// Objetivo: usar if para checar se a resposta foi 200
// ---------------------------------------------

const statusCodeEx1 = 200;

if (statusCodeEx1 === 200) {
  console.log("Exercício 1: Requisição realizada com sucesso");
}

// ---------------------------------------------
// Exercício 2 — Diferenciar sucesso de erro
// Objetivo: usar if / else com base no status code
// ---------------------------------------------

const statusCodeEx2 = 404;

if (statusCodeEx2 === 200) {
  console.log("Exercício 2: Resposta OK");
} else {
  console.log("Exercício 2: Resposta com erro — status:", statusCodeEx2);
}

// ---------------------------------------------
// Exercício 3 — Classificar faixa de status HTTP
// Objetivo: encadear condições com else if
// ---------------------------------------------

const statusCodeEx3 = 500;

if (statusCodeEx3 >= 200 && statusCodeEx3 < 300) {
  console.log("Exercício 3: Sucesso (2xx)");
} else if (statusCodeEx3 >= 400 && statusCodeEx3 < 500) {
  console.log("Exercício 3: Erro do cliente (4xx)");
} else if (statusCodeEx3 >= 500) {
  console.log("Exercício 3: Erro do servidor (5xx)");
} else {
  console.log("Exercício 3: Outro status:", statusCodeEx3);
}

// ---------------------------------------------
// Exercício 4 — Aprovar cenário de teste
// Objetivo: combinar duas condições com &&
// ---------------------------------------------

const loginValido = true;
const perfilAutorizado = true;

if (loginValido && perfilAutorizado) {
  console.log("Exercício 4: Cenário aprovado — usuário pode acessar o sistema");
} else {
  console.log("Exercício 4: Cenário reprovado — acesso negado");
}

console.log("\n=== Fim dos exercícios: estruturas condicionais ===");
