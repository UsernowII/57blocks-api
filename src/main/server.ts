import http from 'node:http';
import { AddressInfo } from 'node:net';

import express, { Express } from 'express';

import { env } from './config/env';
import { ConsoleLogger } from '../shared/logger/console-logger';
import { Logger } from '../shared/logger/logger';
import routes from "./config/routes";

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;
  private readonly logger: Logger;

  constructor() {
    this.logger = new ConsoleLogger();
    this.app = express();
    this.app.use(express.json());
    routes(this.app)
  }

  async start(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(env.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        console.log('Running');
        this.logger.info(
          `App is ready and listening on port ${port} 🚀`,
        );
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
