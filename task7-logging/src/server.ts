
import { init as appInit } from './app';
import CONFIG from './config';
import controllers from './controllers';
import { init as dataAccessInit } from './data-access';
import { init as databaseInit } from './database';
import { init as modelsInit } from './models';
import { ControllersFactory, Logger, LoggerWinston, RequestLogger } from './utils';

const logger = new Logger(CONFIG);
const loggerWinston = LoggerWinston(CONFIG);
const requestLogger = RequestLogger(loggerWinston);

const run = async () => {
  const sequelize = databaseInit(CONFIG.connectionOptions);

  try {
    await databaseInit(CONFIG.connectionOptions).authenticate();
    loggerWinston.info('Connection has been estabilished successfully');
  } catch (err) {
    loggerWinston.error('Unable to connect to the database: ', err);
  }

  const models = await modelsInit(sequelize);
  const dataAccess = await dataAccessInit(sequelize, models);

  const controllersFactory = new ControllersFactory(controllers, dataAccess, logger);

  const app = await appInit(controllersFactory, requestLogger, loggerWinston);

  app.listen(CONFIG.port, () => loggerWinston.info('Server started and listening on port ' + CONFIG.port));
};

run();
