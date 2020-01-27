
import { init as appInit } from './app';
import CONFIG from './config';
import UserController from './controllers/user';
import { init as dataAccessInit } from './data-access';
import { init as databaseInit } from './database';
import { init as modelsInit } from './models';

const run = async () => {
  const sequelize = databaseInit(CONFIG.connectionOptions);
  await databaseInit(CONFIG.connectionOptions).authenticate();

  const models = await modelsInit(sequelize);
  const dataAccess = await dataAccessInit(sequelize, models);

  const userController = new UserController(dataAccess);
  const app = await appInit(userController);

  app.listen(CONFIG.port, () => console.log('Server started and listening on port ' + CONFIG.port));
};

run();
