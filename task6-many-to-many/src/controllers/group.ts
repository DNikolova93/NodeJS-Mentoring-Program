import { NextFunction, Request, Response } from 'express';

export default class GroupController {
  public data: any;
  constructor(data: any) {
    this.data = data.group;
  }

  async getGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;

    try {
      const group = await this.data.get(groupId);

      if (!group) {
        return res.status(404).send(`A group with the specified ID ${groupId} was not found`);
      }
      return res.json(group);
    } catch (e) {
      return res.status(404).send(`A group with the specified ID ${groupId} was not found`);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const group = req.body;

    try {
      const newGroup = await this.data.createGroup(group);

      return res.json(newGroup);
    } catch (e) {
      return res.status(404).send('Group information is missing or invalid');
    }
  }

  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await this.data.getAll();

      return res.json(groups);
    } catch (e) {
      res.status(404).send('Something went terribly wrong');
    }
  }

  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    const groupId = req.params.id;

    try {
      const message = await this.data.deleteGroup(groupId);

      return res.json(message);
    } catch (e) {
      return res.status(500).send(`Fail`);
    }
  }

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
}
