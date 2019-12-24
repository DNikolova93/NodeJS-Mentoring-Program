import { init } from './app';
import UserController from './controllers/user';
import Storage from './storage/userStorage';

const port = process.env.PORT || 3000;

const run = async () => {
  const storage = new Storage();
  const userController = new UserController(storage);

  const data = await init(userController);
  data.listen(port, () => console.log('Server started and listening on port ' + port));
};

run();
