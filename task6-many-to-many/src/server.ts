
import { init as appInit } from './app';
import CONFIG from './config';
import controllers from './controllers';
import { init as dataAccessInit } from './data-access';
import { init as databaseInit } from './database';
import { init as modelsInit } from './models';
import { ControllersFactory, Logger } from './utils';

const logger = new Logger(CONFIG);

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

  const controllersFactory = new ControllersFactory(controllers, dataAccess, logger);

  const app = await appInit(controllersFactory);

  app.listen(CONFIG.port, () => console.log('Server started and listening on port ' + CONFIG.port));
};

run();
