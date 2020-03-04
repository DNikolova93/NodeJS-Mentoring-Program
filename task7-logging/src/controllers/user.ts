import { NextFunction, Request, Response } from 'express';
import { timer } from '../utils';

export default class UserController {
  public data: any;
  constructor(data: any) {
    this.data = data.user;
  }

  @timer
  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    try {
      const user = await this.data.get(userId);

      if (!user) {
        return res.status(404).send(`A user with the specified ID ${userId} was not found`);
      }
      return res.json(user);
    } catch (e) {
      const msg = `A user with the specified ID ${userId} was not found`;
      const error = { message: msg, code: 500, method: req.method, params: req.params };
      return next(new Error(JSON.stringify(error)));
    }
  }

  @timer
  async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    try {
      const newUser = await this.data.createUser(user);

      return res.json(newUser);
    } catch (e) {
      return res.status(404).send('User information is missing or invalid');
    }
  }

  @timer
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.data.getAll();

      return res.json(users);
    } catch (e) {
      return res.status(404).json(e);
    }
  }

  @timer
  async getSuggestUsers(req: Request, res: Response, next: NextFunction) {
    const { loginSubstring, limit } = req.query;

    try {
      const users = await this.data.getAutoSuggestUsers(loginSubstring, limit);

      return res.json(users);
    } catch (e) {
      res.status(404).send('Something went terribly wrong');
    }
  }

  @timer
  async removeUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    try {
      const message = await this.data.removeUser(userId);

      return res.json(message);
    } catch (e) {
      return res.status(500).send(`Fail`);
    }
  }

  @timer
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const data = req.body;

    try {
      const user = await this.data.updateById(userId, data);

      return res.json(user);
    } catch (e) {
      res.status(404).send(`A user with the specified ID ${userId} was not found`);
    }
  }
}
