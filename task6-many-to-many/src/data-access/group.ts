import { Op, Sequelize } from 'sequelize';
import { Group, GroupStatic } from '../types/group';


export class GroupData {
  public db: Sequelize;
  public ModelClass: GroupStatic;
  constructor(db: Sequelize, ModelClass: any) {
    this.db = db;
    this.ModelClass = ModelClass.Group;
  }

  async getAll(): Promise<any> {
    return await this.ModelClass.findAll();
  }

  async get(id: string): Promise<any> {
    return await this.ModelClass.findOne({ where: { id }});
  }

  async updateById(id: string, data: Group): Promise<any> {
    const group = await this.get(id);

    if (!group) {
      throw new Error(`No group was found with ID ${id}`);
    }

    return await this.ModelClass.update({ ...data }, { where: { id }});
  }

  async createGroup(group: Group): Promise<any> {
    const newGroup = new this.ModelClass(group);
    return await newGroup.save();
  }

  async deleteGroup(id: string): Promise<any> {
    const group = await this.get(id);

    if (!group) {
      throw new Error(`No group was found with ID ${id}`);
    }

    return await this.ModelClass.destroy( { where: { id }});
  }
}
