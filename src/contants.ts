import type { SupportedLanguage } from "./types.ts";

export const INITIAL_CODE: Record<SupportedLanguage, string> = {
  javascript: `// Bienbenido a IDE online
// Click 'Run'

const greeting = "Hello, World!";
console.log(greeting);

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));
`,
  basic: `
A = 5
B = 3
PRINT "Resultado: ", A + B
IF A > B THEN PRINT "A es mayor"
END
`,
};

export const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: "basic", label: "basic" },
  { value: "javascript", label: "JavaScript" },
];
