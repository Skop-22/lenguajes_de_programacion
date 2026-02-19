# 🧠 Proyecto Experimental: Creación de un Lenguaje de Programación

## Descripción

Este proyecto es una prueba experimental para la creación de un lenguaje de programación propio, desarrollado desde cero utilizando Vue.js y TypeScript.

El objetivo principal es diseñar e implementar los componentes fundamentales de un lenguaje, incluyendo su análisis, interpretación y ejecución dentro de un entorno interactivo.

---

## Arquitectura del Proyecto

El sistema está compuesto por:

### 1. Análisis Léxico (Lexer)

Se encarga de:

- Leer el código fuente carácter por carácter.
- Identificar tokens como:
  - Variables
  - Números
  - Instrucciones (`PRINT`, `IF`, `END`)
  - Operadores
  - Delimitadores


### 2. Intérprete

Procesa los tokens generados por el lexer y ejecuta:

- Asignaciones de variables
- Operaciones aritméticas
- Condiciones (`IF`)
- Impresiones en consola (`PRINT`)
- Finalización del programa (`END`)


### 3. Consola Interactiva

Desarrollada en Vue, permite:

- Mostrar logs de ejecución
- Mostrar errores
- Visualizar advertencias
- Limpiar la salida
- Scroll automático al último mensaje


## Sintaxis Actual del Lenguaje


### Asignación
```
A = 5
B = 3
```

### Operaciones
```
A + B
A - B
A * B
A / B
```

### Impresión
> PRINT "Resultado:", A + B

### Condicional
> IF A > B THEN PRINT "A es mayor"

### Finalización
> END


## Objetivos del Proyecto

- Comprender cómo funciona internamente un lenguaje de programación.
- Implementar un intérprete desde cero.
- Diseñar reglas sintácticas personalizadas.
- Experimentar con parsing y ejecución.
- Aprender fundamentos de compiladores e intérpretes.

---

## Flujo de Ejecución

1. El usuario escribe código en el editor.
2. El lexer analiza el texto y genera tokens.
3. El intérprete procesa las instrucciones.
4. Los resultados se muestran en la consola interactiva.

---

## Estado Actual

-  Soporte para variables  
-  Operaciones aritméticas básicas  
-  Condicional simple (`IF`)  
-  Impresión en consola  
-  Sistema de logs estructurado  

---

## Futuras Mejoras

- Soporte para bucles (`WHILE`, `FOR`)
- Funciones
- Mejor manejo de errores
- Sistema de tipos
- Compilación a JavaScript
- Debugger visual

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
