import { Options, Sequelize } from 'sequelize';

const init = (connectionConfig: Options) => {
  const sequelize = new Sequelize(connectionConfig);
  return sequelize;
};

export { init };
