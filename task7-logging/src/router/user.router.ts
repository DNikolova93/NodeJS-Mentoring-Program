import { Express, Request, Response, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import passport from 'passport';
import validatorConfigApp from '../app_config/validatorConfig';
import { RequestType } from '../types/requestType';
import { schemas } from '../types/schemas';
import checkToken from '../utils/checkToken';

const router = Router();

export const attach = (
  app: Express,
  controllersFactory: any) => {
  const controller = controllersFactory.getUserController();
  const validator = validatorConfigApp;

  router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {
      controller.getUser(req, res, next);
  });

  router.route('')
    .post(validator(schemas.user, RequestType.Body), (req: Request, res: Response, next: NextFunction) => {
      controller.create(req, res, next);
  });

  router.route('')
    .get((req: Request, res: Response, next: NextFunction) => {
      const queries = req.query;

      (queries['loginSubstring'] && queries['limit'])
        ? controller.getSuggestUsers(req, res, next)
        : controller.getAllUsers(req, res, next);
  });

  router.route('/delete/:id')
    .delete((req: Request, res: Response, next: NextFunction) => {
  });

  router.route('/update/:id')
    .put(validator(schemas.user, RequestType.Body), (req: Request, res: Response, next: NextFunction) => {
      controller.updateUser(req, res, next);
  });

  app.use('/api/users', checkToken,
    passport.authenticate('jwt', { session: false, failureRedirect: '/api/login' } ), router);
};
