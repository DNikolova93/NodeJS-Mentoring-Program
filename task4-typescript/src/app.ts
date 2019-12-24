import express from 'express';
import { Server } from 'http';
import configApp from './config/config';
import attach from './router/user';

export const init = async (controllerFactory: any): Promise<Server> => {
  const http = await import('http');

  const app = express();
  const server = http.createServer(app);

  // routers
  configApp(app);

  attach(app, controllerFactory);

  return Promise.resolve(server);
};
