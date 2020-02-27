import express from 'express';
import { Server } from 'http';
import { Logger } from 'winston';
import configs from './app_config';
import { attachTo } from './router';

export const init = async (controllerFactory: any, requestLogger: any, loggerWinston: Logger): Promise<Server> => {
  const http = await import('http');

  const app = express();

  const server = http.createServer(app);

  configs.baseConfig(app, requestLogger);

  // routers
  attachTo(app, controllerFactory);

  configs.errorConfig(app, controllerFactory, loggerWinston);

  return Promise.resolve(server);
};
