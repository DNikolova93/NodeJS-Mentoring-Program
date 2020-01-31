import { Sequelize } from 'sequelize';
import { UserData } from './user';
import { GroupData } from './group';

const init = (database: Sequelize, models: any) => {
  return Promise.resolve({
    db: database,
    user: new UserData(database, models),
    group: new GroupData(database, models),
  });
};

export { init };
