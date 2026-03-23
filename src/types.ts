export type SupportedLanguage =
  | "javascript"
  | "basic";

export type LogType = "log" | "error" | "warn" | "info";

export interface LogEntry {
  type: LogType;
  content: string;
  timestamp: Date;
}
