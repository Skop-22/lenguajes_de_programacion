import { ref } from "vue";
import { ejecutar } from "./lenguage/basic.ts";

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

    const captureLog = (type: LogEntry["type"], content: string) => {
      newLogs.push({
        type,
        content,
        timestamp: new Date(),
      });
    };
    if (language === "javascript" || language === "typescript") {
      const sandboxConsole = {
        log: (...args: unknown[]) =>
          captureLog(
            "log",
            args.map((a) => String(a)).join(" "),
          ),
        error: (...args: unknown[]) =>
          captureLog(
            "error",
            args.map((a) => String(a)).join(" "),
          ),
        warn: (...args: unknown[]) =>
          captureLog(
            "warn",
            args.map((a) => String(a)).join(" "),
          ),
        info: (...args: unknown[]) =>
          captureLog(
            "info",
            args.map((a) => String(a)).join(" "),
          ),
      };

      try {
        const run = new Function("console", code);
        run(sandboxConsole);
      } catch (err) {
        captureLog("error", err instanceof Error ? err.message : String(err));
      }
    } else if (language === "basic") {
      try {
        const originalLog = console.log;

        console.log = (...args: unknown[]) => {
          captureLog(
            "log",
            args.map((a) => String(a)).join(" "),
          );
        };

        ejecutar(code);

        console.log = originalLog;
      } catch (err) {
        captureLog("error", err instanceof Error ? err.message : String(err));
      }
    } else {
      captureLog(
        "info",
        `Execution for ${language} is not implemented.`,
      );
    }

    logs.value = [...logs.value, ...newLogs];
    isExecuting.value = false;
  };

  return {
    logs,
    isExecuting,
    executeCode,
    clearLogs,
  };
}
