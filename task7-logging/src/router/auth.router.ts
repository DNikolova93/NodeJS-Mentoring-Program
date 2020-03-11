import { Express, Request, Response, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import validatorConfigApp from '../app_config/validatorConfig';
import { RequestType } from '../types/requestType';
import { schemas } from '../types/schemas';

const router = Router();

export const attach = (
  app: Express,
  controllersFactory: any) => {
  const controller = controllersFactory.getAuthController();

  router.route('/login')
    .post((req: Request, res: Response, next: NextFunction) => {
      controller.login(req, res, next);
  });

  app.use('/api', router);
};
