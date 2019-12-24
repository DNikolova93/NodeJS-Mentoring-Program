import uuid from 'uuid';
import { User } from '../types/user';

export default class Storage {
  data: User[] = [];

  constructor() { }

  getAll(): Promise<{length: number, items: User[]}> {
    const items = this.data.filter(x => !x.isDeleted);
    const response = { length: items.length, items };

    return new Promise((resolve, reject) => {
      resolve(response);
    });
  }

  get(id: string): Promise<User | string> {
    const user = this.getUserById(id);

    return new Promise((resolve, reject) => {
      if (!user || user.isDeleted) {
        reject('User not found');
      }

      resolve(user);
    });
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | string> {
    const items = this.data.filter(x => !x.isDeleted);
    if (!limit || limit < 0 || limit > items.length) {
      limit = items.length;
    }

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      const sortUser = this.data.sort((a, b) => this.compare(a.login, b.login));
      const list = sortUser.filter(x => x.login.includes(loginSubstring) && !x.isDeleted).slice(0, limit);

      if (!list.length) {
        reject('Users not found');
      }

      resolve(list);
    });

  }

  getUserById(id: string): User | undefined {
    return this.data.find(data => data.id === id);
  }

  updateById(id: string, data: User): Promise<User | string> {
    return new Promise((resolve, reject) => {
      if (!this.isUserValid(data)) {
        reject('Invalid User');
      }
      const user = this.getUserById(id);

      if (user && !user.isDeleted) {
        const index = this.data.indexOf(user);
        const oldData = this.data[index] as User;

        this.data[index] = { ...oldData, ...data };
        resolve(this.data[index]);
      } else {
        reject(`No user was found with ID ${id}`);
      }
    });
  }

  createUser(user: User): Promise<string | User> {
    return new Promise((resolve, reject) => {
      if (!this.isUserValid(user)) {
        reject('Invalid User');
      }
      const id = this.generateId();
      const newUser = { ...user, id, isDeleted: false };

      this.data.push(newUser);
      return resolve(newUser);
    });
  }

  removeUser(id: string): Promise<string> {
    const user = this.getUserById(id);

    return new Promise((resolve, reject) => {
      !user ? reject('User not found') : user.isDeleted = true;

      resolve('Success');
    });
  }

  generateId(): string {
    return uuid.v1();
  }

  isUserValid(user: User) {
    const { login, password, age } = user;

    if (typeof login === 'undefined' || login === null ||
        typeof password === 'undefined' || password === null ||
        typeof age === 'undefined' || age === null
     ) {
        return false;
     }

    if (login.length === 0 || password.length === 0 || age <= 0) {
       return false;
     }

    console.log('PASSED');

    return true;
  }

  compare(a: string, b: string): number {
    return a.toLowerCase() > b.toLowerCase() ? 1 : b.toLowerCase() > a.toLowerCase() ? -1 : 0;
  }
}
