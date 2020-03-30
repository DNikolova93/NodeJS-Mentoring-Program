import UserController from '../../../src/controllers/user';

const user: object = {
  id: 'test-id-2',
  login: 'xyz@abc.com',
  password: '12345',
  age: 23,
  isDeleted: false,
  createdAt: '2020-03-10 13:30:31',
  updatedAt: '2020-03-13 13:30:31',
};
const users: any[] = [];

const data: { user: object } = {
  user: {
    getAll: jest.fn().mockReturnValue(Promise.resolve(users)),
    get: jest.fn().mockReturnValue(Promise.resolve(user)),
    getByUsername: jest.fn().mockReturnValue(Promise.resolve(user)),
    getAutoSuggestUsers: jest.fn().mockReturnValue(Promise.resolve(users)),
    updateById: jest.fn().mockReturnValue(Promise.resolve(user)),
    createUser: jest.fn().mockReturnValue(Promise.resolve(user)),
    removeUser: jest.fn().mockReturnValue(Promise.resolve([1])),
  },
};

const getUserController = (config = {}) => new UserController({ ...data, ...config });

describe('User Controller Tests', () => {
  let req: any;
  let res: any;
  let nextMock: any;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
        json: jest.fn(),
      }),
      send: jest.fn(),
    };

    nextMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser tests', () => {

    it('should call next once when no user id is attached to req params', async () => {
      const controller: UserController = getUserController({ user: { get: jest.fn().mockRejectedValue('') } });
      req = { params: {} };
      await controller.getUser(req, res, nextMock);
      expect(nextMock.mock.calls).toHaveLength(1);
    });

    it('should call next with correct Error when there is a invalid user id is attached to req params', async () => {
      const controller: UserController = getUserController({ user: { get: jest.fn().mockRejectedValue('') }});
      req = { params: {
          id: '1',
        },
      };

      const msg = 'A user with the specified ID 1 was not found';
      const error = { message: msg, code: 500, params: { id: '1' } };
      const expectedError = new Error(JSON.stringify(error));
      nextMock = jest.fn().mockReturnValue(expectedError);

      await controller.getUser(req, res, nextMock);
      expect(nextMock).toHaveBeenCalledWith(expectedError);
    });

    it('should call res.json once when there is a valid user id', async () => {
      const controller: UserController = getUserController();
      req = { params: {
        id: 'test-id-2',
        },
      };

      await controller.getUser(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with correct args when there is a valid user id', async () => {
      const controller: UserController = getUserController();
      req = { params: {
        id: 'test-id-2',
        },
      };

      res.json = jest.fn().mockReturnValue(user);

      await controller.getUser(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('create tests', () => {

    it('should call res.status with 404 when promise rejected', async () => {
      const controller: UserController = getUserController({ user: { createUser: jest.fn().mockRejectedValue('') }});
      req = { body: { password: 'test' } };

      await controller.create(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send with a correct message when promise rejected', async () => {
      const controller: UserController = getUserController({ user: { createUser: jest.fn().mockRejectedValue('') }});
      req = { body: { password: 'test' } };

      await controller.create(req, res, nextMock);
      expect(res.status().send).toHaveBeenCalledWith('User information is missing or invalid');
    });

    it('should call res.json once where there is a valid user', async () => {
      const controller: UserController = getUserController();
      const newUser: object = {
        id: 'test-id-2',
        login: 'xyz@abc.com',
        password: '12345',
        age: 23,
      };
      req = { body: { ...newUser } };

      await controller.create(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with correct args when there is a valid user', async () => {
      const controller: UserController = getUserController();
      const newUser: object = {
        id: 'test-id-2',
        login: 'xyz@abc.com',
        password: '12345',
        age: 23,
      };
      req = { body: { ...newUser } };

      await controller.create(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUsers tests', () => {

    it('should call res.status with 404 when a promise rejected', async () => {
      const controller: UserController = getUserController({ user: { getAll: jest.fn().mockRejectedValue('Error') }});

      await controller.getAllUsers(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.json once with a correct message when a promise rejected', async () => {
      const controller: UserController = getUserController({ user: { getAll: jest.fn().mockRejectedValue('Error') }});

      await controller.getAllUsers(req, res, nextMock);
      expect(res.status().json.mock.calls).toHaveLength(1);
      expect(res.status().json).toHaveBeenCalledWith('Error');
    });

    it('should call res.json once', async () => {
      const controller: UserController = getUserController();

      await controller.getAllUsers(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with array of users', async () => {
      const controller: UserController = getUserController();

      await controller.getAllUsers(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe('getSuggestUsers tests', () => {

    it('should call res.status once with 404 when no logginSubstring is attached to req query', async () => {
      const controller: UserController = getUserController({ user:
        { getAutoSuggestUsers: jest.fn().mockRejectedValue('') },
      });
      req = {
        query: {},
      };

      await controller.getSuggestUsers(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send once with a correct message when no logginSubstring is attached to req query',
      async () => {
        const controller: UserController = getUserController({ user:
          { getAutoSuggestUsers: jest.fn().mockRejectedValue('') },
        });
        req = {
          query: {},
        };

        await controller.getSuggestUsers(req, res, nextMock);
        expect(res.status().send.mock.calls).toHaveLength(1);
        expect(res.status().send).toHaveBeenCalledWith('Something went terribly wrong');
      });

    it('should call res.json once when logginSubstring is attached to req query', async () => {
      const controller: UserController = getUserController();
      req = {
        query: { loginSubstring: 'xyz' },
      };

      await controller.getSuggestUsers(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with correct args when logginSubstring is attached to req query', async () => {
      const controller: UserController = getUserController();
      req = {
        query: { loginSubstring: 'xyz' },
      };

      await controller.getSuggestUsers(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe('removeUser tests', () => {

    it('should call res.status once with 500 when no user id is attached to req params', async () => {
      const controller: UserController = getUserController({ user: { removeUser: jest.fn().mockRejectedValue('') } });
      req = { params: {} };

      await controller.removeUser(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should call res.status.send once with a correct message when no user id is attached to req params',
      async () => {
        const controller: UserController = getUserController({ user: { removeUser: jest.fn().mockRejectedValue('') } });
        req = { params: {} };

        await controller.removeUser(req, res, nextMock);
        expect(res.status().send.mock.calls).toHaveLength(1);
        expect(res.status().send).toHaveBeenCalledWith('Fail');
    });

    it('should call res.json once when user id is attached to req params',
      async () => {
        const controller: UserController = getUserController();
        req = {
          params: {
            id: 'test-id-2',
          },
        };

        await controller.removeUser(req, res, nextMock);
        expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with a correct message when user id is attached to req params',
      async () => {
        const controller: UserController = getUserController();
        req = {
          params: {
            id: 'test-id-2',
          },
        };

        await controller.removeUser(req, res, nextMock);
        expect(res.json).toHaveBeenCalledWith([1]);
    });
  });

  describe('updateUser tests', () => {

    it('should call res.status once with 404 when no user id is attached to req.params', async () => {
      const controller: UserController = getUserController({ user: { updateById: jest.fn().mockRejectedValue('') }});
      req = {
        params: {},
        body: {
          age: 25,
          password: 'test-pass',
        },
      };

      await controller.updateUser(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send once with a correct message when no user id is attached to req.params',
    async () => {
      const controller: UserController = getUserController({ user: { updateById: jest.fn().mockRejectedValue('') }});
      req = {
        params: {},
        body: {
          age: 25,
          password: 'test-pass',
        },
      };

      const expectedMessage = `A user with the specified ID undefined was not found`;

      await controller.updateUser(req, res, nextMock);
      expect(res.status().send.mock.calls).toHaveLength(1);
      expect(res.status().send).toHaveBeenCalledWith(expectedMessage);
    });

    it('should call res.json once when user id is attached to req.params', async () => {
      const newUser = { ...user, age: 25, password: 'test-pass' };
      const controller: UserController = getUserController({ user: { updateById: jest.fn().mockReturnValue(newUser) }});
      req = {
        params: {
          id: 'test-id-2',
        },
        body: {
          age: 25,
          password: 'test-pass',
        },
      };

      await controller.updateUser(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with a correct updated user when user id is attached to req.params', async () => {
      const newUser = { ...user, age: 25, password: 'test-pass' };
      const controller: UserController = getUserController({ user: { updateById: jest.fn().mockReturnValue(newUser) }});
      req = {
        params: {
          id: 'test-id-2',
        },
        body: {
          age: 25,
          password: 'test-pass',
        },
      };

      await controller.updateUser(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it('should call res.status once with 404 when no user is attached to req.body', async () => {
      const controller: UserController = getUserController({ user: { updateById: jest.fn().mockRejectedValue('') }});
      req = {
        params: {
          id: 'test-id-2',
        },
      };

      await controller.updateUser(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
