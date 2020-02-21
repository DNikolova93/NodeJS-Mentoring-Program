import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

export const init = (sequelize: Sequelize) => {
  const db: any = {};
  fs
    .readdirSync(__dirname)
    .filter(file =>
      (file.indexOf('.') !== 0) && (file !== 'index.ts'))
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
      console.log(model.name);
    });

  Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  // Is asynchronous but we won't wait here
  sequelize.sync();

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
