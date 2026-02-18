const DELIMITADOR = 1;
const VARIABLE = 2;
const NUMERO = 3;
const INSTRUCCION = 4;
const COMILLA = 5;

const PRINT = 1;
const INPUT = 2;
const IF = 3;
const THEN = 4;
const END = 5;
const EOL = 6;
const FINISHED = 7;

let variables = new Array(26).fill(0);
let programa = "";
let progIndex = 0;
let token = "";
let tokenTipo = 0;
let instruccion = 0;

const tablaInstrucciones = {
  print: PRINT,
  input: INPUT,
  if: IF,
  then: THEN,
  end: END
};

function esBlanco(c) {
  return c === " " || c === "\t";
}

function esDelimitador(c) {
  return "+-*/%=<>(),".includes(c);
}

function lexico() {
  token = "";
  instruccion = 0;

  if (progIndex >= programa.length) {
    instruccion = FINISHED;
    return tokenTipo = DELIMITADOR;
  }

  while (esBlanco(programa[progIndex])) progIndex++;

  let c = programa[progIndex];

  if (c === "\n") {
    progIndex++;
    instruccion = EOL;
    return tokenTipo = DELIMITADOR;
  }

  if (esDelimitador(c)) {
    token = c;
    progIndex++;
    return tokenTipo = DELIMITADOR;
  }

  if (c === '"') {
    progIndex++;
    while (programa[progIndex] !== '"') {
      token += programa[progIndex++];
    }
    progIndex++;
    return tokenTipo = COMILLA;
  }

  if (/\d/.test(c)) {
    while (/\d/.test(programa[progIndex])) {
      token += programa[progIndex++];
    }
    return tokenTipo = NUMERO;
  }

  if (/[a-z]/i.test(c)) {
    while (/[a-z]/i.test(programa[progIndex])) {
      token += programa[progIndex++];
    }
    token = token.toLowerCase();

    if (tablaInstrucciones[token]) {
      instruccion = tablaInstrucciones[token];
      return tokenTipo = INSTRUCCION;
    }

    return tokenTipo = VARIABLE;
  }
}

function primitiva() {
  if (tokenTipo === NUMERO) {
    let v = parseInt(token);
    lexico();
    return v;
  }

  if (tokenTipo === VARIABLE) {
    let idx = token.toUpperCase().charCodeAt(0) - 65;
    lexico();
    return variables[idx];
  }

  throw "Expresión inválida";
}

function termino() {
  let resultado = primitiva();

  while (token === "*" || token === "/") {
    let op = token;
    lexico();
    let derecho = primitiva();

    if (op === "*") resultado *= derecho;
    if (op === "/") resultado = Math.floor(resultado / derecho);
  }

  return resultado;
}

function expresion() {
  let resultado = termino();

  while (token === "+" || token === "-") {
    let op = token;
    lexico();
    let derecho = termino();

    if (op === "+") resultado += derecho;
    if (op === "-") resultado -= derecho;
  }

  return resultado;
}

function ejecutarPrint() {
  let salida = "";

  do {
    lexico();

    if (tokenTipo === COMILLA) {
      salida += token;
      lexico();
    } else {
      progIndex -= token.length;
      lexico();
      let val = expresion();
      salida += val;
    }

  } while (token === ",");

  console.log(salida);
}

function ejecutarIf() {
  lexico();
  let izq = expresion();

  let op = token;
  lexico();

  let der = expresion();

  let condicion = false;

  if (op === "=") condicion = izq === der;
  if (op === "<") condicion = izq < der;
  if (op === ">") condicion = izq > der;

  if (!condicion) {
    while (programa[progIndex] !== "\n" &&
           progIndex < programa.length) {
      progIndex++;
    }
  }
}

function ejecutarAsignacion() {
  let varIdx = token.toUpperCase().charCodeAt(0) - 65;

  lexico();
  if (token !== "=") throw "Se esperaba =";

  lexico();
  let val = expresion();

  variables[varIdx] = val;
}

function ejecutar(codigo) {
  programa = codigo;
  progIndex = 0;

  while (true) {
    lexico();

    if (tokenTipo === VARIABLE) {
      ejecutarAsignacion();
    } else {
      switch (instruccion) {
        case PRINT:
          ejecutarPrint();
          break;
        case IF:
          ejecutarIf();
          break;
        case END:
          return;
      }
    }

    if (instruccion === FINISHED) break;
  }
}

const codigo = `
A = 5
B = 3
PRINT "Resultado: ", A + B
IF A > B THEN PRINT "A es mayor"
END
`;

ejecutar(codigo);
