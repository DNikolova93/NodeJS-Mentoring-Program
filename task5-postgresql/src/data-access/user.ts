import { Sequelize } from 'sequelize';
import { User, UserStatic } from '../types/user';

export class UserData {
  public db: Sequelize;
  public ModelClass: UserStatic;
  constructor(db: Sequelize, ModelClass: any) {
    this.db = db;
    this.ModelClass = ModelClass.User;
  }

  async getAll(): Promise<{length: number, items: User[]}> {
    return await this.ModelClass.findAll({ where: { isDeleted: false } });
  }

  async get(id: string): Promise<User | undefined> {
    return await this.ModelClass.findOne({ where: { id, isDeleted: false }});
  }

  // getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | string> {
  //   const items = this.data.filter(x => !x.isDeleted);
  //   if (!limit || limit < 0 || limit > items.length) {
  //     limit = items.length;
  //   }

  //   // tslint:disable-next-line:no-shadowed-variable
  //   return new Promise((resolve, reject) => {
  //     const sortUser = this.data.sort((a, b) => this.compare(a.login, b.login));
  //     const list = sortUser.filter(x => x.login.includes(loginSubstring) && !x.isDeleted).slice(0, limit);

  //     if (!list.length) {
  //       reject('Users not found');
  //     }

  //     resolve(list);
  //   });

  // }

  async updateById(id: string, data: User): Promise<User | string> {
    const user = await this.get(id);

    if (!user) {
      throw new Error(`No user was found with ID ${id}`);
    }

    return await this.ModelClass.update({ ...data }, { where: { id }});
  }

  async createUser(user: User): Promise<string | User> {
    user.isDeleted = false;
    const newUser = new this.ModelClass(user);
    return await newUser.save();
  }

  async removeUser(id: string): Promise<string> {
    const user = await this.get(id);

    if (!user) {
      throw new Error(`No user was found with ID ${id}`);
    }

    return await this.ModelClass.update({ isDeleted: true }, { where: { id }});
  }

  compare(a: string, b: string): number {
    return a.toLowerCase() > b.toLowerCase() ? 1 : b.toLowerCase() > a.toLowerCase() ? -1 : 0;
  }
}
