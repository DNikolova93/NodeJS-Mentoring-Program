import bodyParser from 'body-parser';
import { Express } from 'express';
import expressRequestId from 'express-request-id';

const configApp = (app: Express, requestLogger: any) => {

  app.use(expressRequestId());
  app.use(requestLogger);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default configApp;
