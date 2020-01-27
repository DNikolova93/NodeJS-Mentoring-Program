import { Sequelize } from 'sequelize';
import { UserData } from './user';

const init = (database: Sequelize, models: any) => {
  return Promise.resolve({
    db: database,
    user: new UserData(database, models),
  });
};

export { init };
