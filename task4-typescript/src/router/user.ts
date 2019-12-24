import { Express, Request, Response, Router } from 'express';
import { NextFunction } from 'express-serve-static-core';
import UserController from '../controllers/user';
const router = Router();

const attach = (app: Express, controllerFactory: UserController) => {
  const controller = controllerFactory;

  app.get('/404', (req, res) => {
    res.send('THE PAGE YOUR ARE LOOKIGN FOR DOES NOT EXIST');
  });

  router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {
      controller.getUser(req, res, next);
  });

  router.route('')
    .post((req: Request, res: Response, next: NextFunction) => {
      controller.create(req, res, next);
  });

  router.route('')
    .get((req: Request, res: Response, next: NextFunction) => {
      const queries = req.query;

      (queries['loginSubstring'] && queries['limit'])
        ? controllerFactory.getSuggestUsers(req, res, next)
        : controller.getAllUsers(req, res, next);
  });

  router.route('/delete/:id')
    .delete((req, res, next) => {
      controller.removeUser(req, res, next);
  });

  router.route('/update/:id')
    .put((req: Request, res: Response, next: NextFunction) => {
      controllerFactory.updateUser(req, res, next);
  });

  app.use('/api/users', router);

  app.get('*', (req, res) => {
    res.redirect('/404');
  });
};

export default attach;
