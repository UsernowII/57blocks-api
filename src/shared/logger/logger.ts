export type Attributes = unknown;

export interface Logger {
  info: (message: string, attributes?: Attributes) => void;
}
