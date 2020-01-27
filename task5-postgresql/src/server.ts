// import { init } from './app';
// import UserController from './controllers/user';
// import Storage from './storage/userStorage';

// const port = process.env.PORT || 3000;

// const run = async () => {
//   const storage = new Storage();
//   const userController = new UserController(storage);

//   const data = await init(userController);
//   data.listen(port, () => console.log('Server started and listening on port ' + port));
// };

// run();

import { Client, Pool } from 'pg';
import { Sequelize } from 'sequelize';


const client = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('Sucessfuly created');
});

client.connect()
  .then(() => {
    console.log('Connected successfully');
  })
  .then(() => {
    const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY NOT NULL,
        login text NOT NULL,
        password VARCHAR(130) NOT NULL,
        age integer NOT NULL,
        isDeleted bool NOT NULL
      )`;

    client.query(queryText);
  })
  .then(() => sequelize.query('SELECT * FROM users'))
  .then(data => console.log(data))
  .catch((err: any) => {
    console.log(err);
  }).finally(() => client.end());
