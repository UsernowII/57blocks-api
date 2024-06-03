import { ILogger } from '../interfaces/ILogger';

export class ConsoleLogger implements ILogger {
  info(message: string, attributes: unknown = {}) {
    const message_ = {
      message,
      attributes,
    };

    console.log(message_);
  }
}
