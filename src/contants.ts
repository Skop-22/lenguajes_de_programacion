import type { SupportedLanguage } from "./types.ts";

export const INITIAL_CODE: Record<SupportedLanguage, string> = {
  javascript: `// Welcome to Gemini IDE
// Click 'Run' to execute this code

const greeting = "Hello, World!";
console.log(greeting);

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));
`,
  json: `{ "name": "Gemini IDE", "version": "1.0.0" }`,
};

export const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "json", label: "JSON" },
];
