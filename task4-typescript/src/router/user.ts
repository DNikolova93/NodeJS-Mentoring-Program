import { Express, Request, Response, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import validatorConfigApp from '../config/validatorConfig';
import UserController from '../controllers/user';
import { RequestType } from '../types/requestType';
import { schemas } from '../types/schemas';

const router = Router();

const attach = (
  app: Express,
  userControllerFactory: UserController) => {
  const controller = userControllerFactory;
  const validator = validatorConfigApp;

  app.get('/404', (req: Request, res: Response) => {
    res.send('THE PAGE YOUR ARE LOOKIGN FOR DOES NOT EXIST');
  });

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
    .delete((req, res, next) => {
      controller.removeUser(req, res, next);
  });

  router.route('/update/:id')
    .put(validator(schemas.user, RequestType.Body), (req: Request, res: Response, next: NextFunction) => {
      controller.updateUser(req, res, next);
  });

  app.use('/api/users', router);

  app.get('*', (req: Request, res: Response) => {
    res.redirect('/404');
  });
};

export default attach;
