export class AccessDeniedError extends Error {
  constructor(message: string) {
    super(`Access Denied: ${message}`);
    this.name = 'AccessDeniedError';
  }
}
