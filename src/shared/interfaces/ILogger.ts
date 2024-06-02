export type Attributes = unknown;

export interface ILogger {
  info: (message: string, attributes?: Attributes) => void;
}
