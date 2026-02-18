import { ref } from "vue";

export interface LogEntry {
  type: "log" | "error" | "warn" | "info";
  content: string;
  timestamp: Date;
}

export function useExecution() {
  const logs = ref<LogEntry[]>([]);
  const isExecuting = ref(false);

  const clearLogs = () => {
    logs.value = [];
  };

  const executeCode = (code: string, language: string) => {
    isExecuting.value = true;
    const newLogs: LogEntry[] = [];

    // Soporte real solo para JavaScript / TypeScript
    if (language === "javascript" || language === "typescript") {
      const captureLog = (type: LogEntry["type"], ...args: any[]) => {
        const content = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ");

        newLogs.push({
          type,
          content,
          timestamp: new Date(),
        });
      };

      // Consola sandbox
      const sandboxConsole = {
        log: (...args: any[]) => captureLog("log", ...args),
        error: (...args: any[]) => captureLog("error", ...args),
        warn: (...args: any[]) => captureLog("warn", ...args),
        info: (...args: any[]) => captureLog("info", ...args),
      };

      try {
        // Sandbox básico (solo demostración)
        const run = new Function("console", code);
        run(sandboxConsole);
      } catch (err: any) {
        captureLog("error", `Execution Error: ${err.message}`);
      } finally {
        logs.value = [...logs.value, ...newLogs];
        isExecuting.value = false;
      }
    } else {
      // Simulación para otros lenguajes
      logs.value.push({
        type: "info",
        content:
          `Execution for ${language} is currently only available via backend integration. Simulating output...`,
        timestamp: new Date(),
      });

      isExecuting.value = false;
    }
  };

  return {
    logs,
    isExecuting,
    executeCode,
    clearLogs,
  };
}
