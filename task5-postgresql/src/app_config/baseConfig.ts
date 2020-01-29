import bodyParser from 'body-parser';
import express from 'express';

const configApp = (app: express.Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default configApp;
