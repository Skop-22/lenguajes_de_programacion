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

let variables: number[] = new Array(26).fill(0);
let programa: string = "";
let progIndex: number = 0;
let token: string = "";
let tokenTipo: number = 0;
let instruccion: number = 0;

const tablaInstrucciones: Record<string, number> = {
  print: PRINT,
  input: INPUT,
  if: IF,
  then: THEN,
  end: END,
};

function esBlanco(c: string): boolean {
  return c === " " || c === "\t";
}

function esDelimitador(c: string): boolean {
  return "+-*/%=<>(),".includes(c);
}

function lexico(): number {
  token = "";
  instruccion = 0;

  if (progIndex >= programa.length) {
    instruccion = FINISHED;
    tokenTipo = DELIMITADOR;
    return tokenTipo;
  }

  while (progIndex < programa.length && esBlanco(programa[progIndex]!)) {
    progIndex++;
  }

  if (progIndex >= programa.length) {
    instruccion = FINISHED;
    tokenTipo = DELIMITADOR;
    return tokenTipo;
  }

  let c: string = programa[progIndex]!;

  if (c === "\n") {
    progIndex++;
    instruccion = EOL;
    tokenTipo = DELIMITADOR;
    return tokenTipo;
  }

  if (esDelimitador(c)) {
    token = c;
    progIndex++;
    tokenTipo = DELIMITADOR;
    return tokenTipo;
  }

  if (c === '"') {
    progIndex++;
    while (progIndex < programa.length && programa[progIndex] !== '"') {
      token += programa[progIndex]!;
      progIndex++;
    }
    progIndex++;
    tokenTipo = COMILLA;
    return tokenTipo;
  }

  if (/\d/.test(c)) {
    while (progIndex < programa.length && /\d/.test(programa[progIndex]!)) {
      token += programa[progIndex]!;
      progIndex++;
    }
    tokenTipo = NUMERO;
    return tokenTipo;
  }

  if (/[a-z]/i.test(c)) {
    while (progIndex < programa.length && /[a-z]/i.test(programa[progIndex]!)) {
      token += programa[progIndex]!;
      progIndex++;
    }

    token = token.toLowerCase();

    const instr = tablaInstrucciones[token as keyof typeof tablaInstrucciones];

    if (instr !== undefined) {
      instruccion = instr;
      tokenTipo = INSTRUCCION;
      return tokenTipo;
    }

    tokenTipo = VARIABLE;
    return tokenTipo;
  }

  tokenTipo = DELIMITADOR;
  return tokenTipo;
}

function primitiva(): number {
  if (tokenTipo === NUMERO) {
    let v = parseInt(token);
    lexico();
    return v;
  }

  if (tokenTipo === VARIABLE) {
    let idx = token.toUpperCase().charCodeAt(0) - 65;
    lexico();
    return variables[idx]!;
  }

  throw new Error("Expresión inválida");
}

function termino(): number {
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

function expresion(): number {
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

function ejecutarPrint(): void {
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

function ejecutarIf(): void {
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
    while (
      progIndex < programa.length &&
      programa[progIndex] !== "\n"
    ) {
      progIndex++;
    }
  }
}

function ejecutarAsignacion(): void {
  let varIdx = token.toUpperCase().charCodeAt(0) - 65;

  lexico();
  if (token !== "=") throw new Error("Se esperaba =");

  lexico();
  let val = expresion();

  variables[varIdx] = val;
}

export function ejecutar(codigo: string): void {
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

// const codigo = `
// A = 5
// B = 3
// PRINT "Resultado: ", A + B
// IF A > B THEN PRINT "A es mayor"
// END
// `;
//
// ejecutar(codigo);

