import { Sequelize } from 'sequelize';
import { GroupData } from './group';
import { UserData } from './user';

const init = (database: Sequelize, models: any) => {
  return Promise.resolve({
    db: database,
    user: new UserData(database, models),
    group: new GroupData(database, models)
  });
};

export { init };
