import http from 'node:http';
import { AddressInfo } from 'node:net';

import express, { Express } from 'express';

import { env } from './config/env';
import { ConsoleLogger } from '../shared/logger/console-logger';
import { ILogger } from '../shared/interfaces/ILogger';
import routes from './config/routes';

export class Server {
  private readonly app: Express;
  private readonly logger: ILogger;
  private httpServer?: http.Server;

  constructor() {
    this.logger = new ConsoleLogger();
    this.app = express();
    this.app.use(express.json());
  }

  async start(): Promise<void> {
    await routes(this.app);
    return new Promise(resolve => {
      this.httpServer = this.app.listen(env.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        this.logger.info(`App is ready and listening on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
