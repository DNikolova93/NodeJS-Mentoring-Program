import { Express, Request, Response, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import passport from 'passport';
import validatorConfigApp from '../app_config/validatorConfig';
import { RequestType } from '../types/requestType';
import { schemas } from '../types/schemas';

const router = Router();

export const attach = (
  app: Express,
  controllersFactory: any) => {
  const controller = controllersFactory.getGroupController();
  const validator = validatorConfigApp;

  router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {
      controller.getGroup(req, res, next);
  });

  router.route('')
    .post(validator(schemas.group, RequestType.Body), (req: Request, res: Response, next: NextFunction) => {
      controller.create(req, res, next);
  });

  router.route('')
    .get((req: Request, res: Response, next: NextFunction) => {
      controller.getAllGroups(req, res, next);
  });

  router.route('/delete/:id')
    .delete((req: Request, res: Response, next: NextFunction) => {
      controller.deleteGroup(req, res, next);
  });

  router.route('/update/:id')
    .put(validator(schemas.group, RequestType.Body), (req: Request, res: Response, next: NextFunction) => {
      controller.updateGroup(req, res, next);
  });

  router.route('/addUsers/:id')
    .put((req: Request, res: Response, next: NextFunction) => {
      controller.addUsersToGroup(req, res, next);
  });

  app.use('/api/groups', passport.authenticate('jwt', { session: false }), router);
};
