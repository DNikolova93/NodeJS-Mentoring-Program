import { NextFunction, Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { timer } from '../utils';

export default class GroupController {
  public data: any;
  constructor(data: any) {
    this.data = data.group;
  }

  @timer
  async getGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;

    try {
      const group = await this.data.get(groupId);

      return res.json(group);
    } catch (e) {
      const msg = `A group with the specified ID ${groupId} was not found`;
      const error = { message: msg, code: 500, method: req.method, params: req.params };
      return next(new Error(JSON.stringify(error)));
    }
  }

  @timer
  async create(req: Request, res: Response, next: NextFunction) {
    const group = req.body;

    try {
      const newGroup = await this.data.createGroup(group);
      return res.json(newGroup);
    } catch (e) {
      return res.status(404).send('Group information is missing or invalid');
    }
  }

  @timer
  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await this.data.getAll();

      return res.json(groups);
    } catch (e) {
      res.status(404).send('Something went terribly wrong');
    }
  }

  @timer
  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;

    try {
      const message = await this.data.deleteGroup(groupId);

      return res.json(message);
    } catch (e) {
      return res.status(500).send(`Fail`);
    }
  }

  @timer
  async updateGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;
    const data = req.body;

    try {
      const group = await this.data.updateById(groupId, data);

      return res.json(group);
    } catch (e) {
      res.status(404).send(`A group with the specified ID ${groupId} was not found`);
    }
  }

  @timer
  async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;
    const { users } = req.body;
    let transaction: Transaction | undefined;

    try {
      transaction = await this.data.db.transaction();
      const updatedGroup = await this.data.addUsersToGroup(groupId, users, transaction);
      return res.json(updatedGroup);
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }

      if (e && e.message === `No group was found with ID ${groupId}`) {
        res.status(404).send(e.message);
      }

      res.status(404).send(`A users with the specified IDs was not found`);
    }
  }
}
