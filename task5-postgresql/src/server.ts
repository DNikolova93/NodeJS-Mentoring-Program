
import { init as appInit } from './app';
import CONFIG from './config';
import UserController from './controllers/user';
import { init as dataAccessInit } from './data-access';
import { init as databaseInit } from './database';
import { init as modelsInit } from './models';

const run = async () => {
  const sequelize = databaseInit(CONFIG.connectionOptions);

  try {
    await databaseInit(CONFIG.connectionOptions).authenticate();
    console.log('Connection has been estabilished successfully');
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }

  const models = await modelsInit(sequelize);
  const dataAccess = await dataAccessInit(sequelize, models);

  const userController = new UserController(dataAccess);
  const app = await appInit(userController);

  app.listen(CONFIG.port, () => console.log('Server started and listening on port ' + CONFIG.port));
};

run();
