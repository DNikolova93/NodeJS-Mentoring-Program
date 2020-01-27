import { NextFunction, Request, Response } from 'express';
import Storage from '../storage/userStorage';

export default class UserController {
  storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    try {
      const user = await this.storage.get(userId);

      if (!user) {
        return res.status(404).send(`A user with the specified ID ${userId} was not found`);
      }
      return res.json(user);
    } catch (e) {
      return res.status(404).send(`A user with the specified ID ${userId} was not found`);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    try {
      const newUser = await this.storage.createUser(user);

      return res.json(newUser);
    } catch (e) {
      return res.status(404).send('User information is missing or invalid');
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.storage.getAll();

      return res.json(users);
    } catch (e) {
      res.status(404).send('Something went terribly wrong');
    }
  }

  async getSuggestUsers(req: Request, res: Response, next: NextFunction) {
    const { loginSubstring, limit } = req.query;

    try {
      const users = await this.storage.getAutoSuggestUsers(loginSubstring, limit);

      return res.json(users);
    } catch (e) {
      res.status(404).send('Something went terribly wrong');
    }
  }

  async removeUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    try {
      const message = await this.storage.removeUser(userId);

      return res.json(message);
    } catch (e) {
      return res.status(500).send(`Fail`);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const data = req.body;

    try {
      const user = await this.storage.updateById(userId, data);

      return res.json(user);
    } catch (e) {
      res.status(404).send(`A user with the specified ID ${userId} was not found`);
    }
  }
}
