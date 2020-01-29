import { Op, Sequelize } from 'sequelize';
import { User, UserStatic } from '../types/user';

export class UserData {
  public db: Sequelize;
  public ModelClass: UserStatic;
  constructor(db: Sequelize, ModelClass: any) {
    this.db = db;
    this.ModelClass = ModelClass.User;
  }

  async getAll(): Promise<any> {
    return await this.ModelClass.findAll({ where: { isDeleted: false } });
  }

  async get(id: string): Promise<any> {
    return await this.ModelClass.findOne({ where: { id, isDeleted: false }});
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<any> {
    const items = await this.getAll();
    if (!limit || limit < 0 || limit > items.length) {
      limit = items.length;
    }

    return await this.ModelClass.findAll({ limit,
      where: {
        isDeleted: false,
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      order: Sequelize.col('login'),
    });
  }

  async updateById(id: string, data: User): Promise<any> {
    const user = await this.get(id);

    if (!user) {
      throw new Error(`No user was found with ID ${id}`);
    }

    return await this.ModelClass.update({ ...data }, { where: { id }});
  }

  async createUser(user: User): Promise<any> {
    user.isDeleted = false;
    const newUser = new this.ModelClass(user);
    return await newUser.save();
  }

  async removeUser(id: string): Promise<any> {
    const user = await this.get(id);

    if (!user) {
      throw new Error(`No user was found with ID ${id}`);
    }

    return await this.ModelClass.update({ isDeleted: true }, { where: { id }});
  }
}
