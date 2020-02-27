import { Options, Sequelize } from 'sequelize';

const init = (connectionConfig: Options) => {
  const sequelize = new Sequelize({...connectionConfig, logging: false});
  return sequelize;
};

export { init };
