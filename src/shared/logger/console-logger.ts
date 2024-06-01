import { Logger } from './logger';

export class ConsoleLogger implements Logger {
  info(message: string, attributes: unknown = {}) {
    const message_ = {
      message,
      attributes,
    };

    console.log(message_);
  }
}
