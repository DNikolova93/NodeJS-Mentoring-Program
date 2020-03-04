import { Express, NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { ControllersFactory } from './../utils/controllerFactory';

const errorConfigApp = (
  app: Express,
  controllersFactory: ControllersFactory,
  loggerWinston: Logger,
) => {
  const controller = controllersFactory.getErrorController();

  process.on('uncaughtException', (err: Error) => {
    loggerWinston.error(err.message);
    process.exit(-1);
  });

  process.on('unhandledRejection', (reason: Error | any, promise: Promise<any>) => {
    loggerWinston.error('an unhandled rejection detected', reason);
    process.exit(-1);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return controller.handleError(err, req, res, next);
  });
};

export default errorConfigApp;
