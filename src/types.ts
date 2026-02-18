export type SupportedLanguage =
  | "javascript"
  | "json";

export type LogType = "log" | "error" | "warn" | "info";

export interface LogEntry {
  type: LogType;
  content: string;
  timestamp: Date;
}
