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

    // filter by isDeleted property
    return this.ModelClass.findAll({ where: { isDeleted: false } });
  }

  async get(id: string): Promise<User | undefined> {
    // const user = this.getUserById(id);

    // return new Promise((resolve, reject) => {
    //   if (!user || user.isDeleted) {
    //     reject('User not found');
    //   }

    //   resolve(user);
    // });

    return this.ModelClass.findByPk(id);
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

  // getUserById(id: string): User | undefined {
  //   return this.data.find(data => data.id === id);
  // }

  // async updateById(id: string, data: User): Promise<User | string> {
  //   let user = await this.get(id) as User;

  //   if (!user) {
  //     throw new Error(`No user was found with ID ${id}`);
  //   }

  //   user = { ...user, ...data };

  //   return user.save();
  // }

  async createUser(user: User): Promise<string | User> {
    console.log(user);
    user.isDeleted = false;
    const newUser = new this.ModelClass(user);
    console.log('new user', newUser);
    return await newUser.save();
  }

  async removeUser(id: string): Promise<string> {
    const user = await this.get(id);

    if (!user)  {
      throw new Error(`No user was found with ID ${id}`);
    }

    user.isDeleted = true;

    const updatedUser = new this.ModelClass(user);

    return updatedUser.save();
  }

  // isUserValid(user: User) {
  //   const { login, password, age } = user;

  //   if (typeof login === 'undefined' || login === null ||
  //       typeof password === 'undefined' || password === null ||
  //       typeof age === 'undefined' || age === null
  //    ) {
  //       return false;
  //    }

  //   if (login.length === 0 || password.length === 0 || age <= 0) {
  //      return false;
  //    }

  //   console.log('PASSED');

  //   return true;
  // }

  compare(a: string, b: string): number {
    return a.toLowerCase() > b.toLowerCase() ? 1 : b.toLowerCase() > a.toLowerCase() ? -1 : 0;
  }
}
