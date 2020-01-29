import express from 'express';
import { Server } from 'http';
import configApp from './app_config/baseConfig';
import UserController from './controllers/user';
import attach from './router/user';

export const init = async (controllerFactory: UserController): Promise<Server> => {
  const http = await import('http');

  const app = express();
  const server = http.createServer(app);

  configApp(app);

  // routers
  attach(app, controllerFactory);

  return Promise.resolve(server);
};
