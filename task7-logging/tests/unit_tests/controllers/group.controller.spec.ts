import GroupController from '../../../src/controllers/group';

const group: object = {
  id: 'test-id-1',
  name: 'Test Group',
  permissions: ['DELETE', 'UPLOAD'],
  createdAt: '2020-03-10 13:30:31',
  updatedAt: '2020-03-13 13:30:31',
};

const groups: any[] = [];

const data: { group: any } = {
  group: {
    getAll: jest.fn().mockReturnValue(Promise.resolve(groups)),
    get: jest.fn().mockReturnValue(Promise.resolve(group)),
    updateById: jest.fn().mockReturnValue(Promise.resolve(group)),
    createGroup: jest.fn().mockReturnValue(Promise.resolve(group)),
    deleteGroup: jest.fn().mockReturnValue(Promise.resolve([1])),
    addUsersToGroup: jest.fn().mockReturnValue(Promise.resolve(group)),
    db: { transaction: jest.fn().mockReturnValue({
      rollback: jest.fn(),
    }) },
  },
};

const getGroupController = (config = {}) => new GroupController({ ...data, ...config });

describe('Group Controller Tests', () => {
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

  describe('getGroup tests', () => {

    it('should call next once when no group id is attached to req params', async () => {
      const controller: GroupController = getGroupController({ group: { get: jest.fn().mockRejectedValue('') } });
      req = { params: {} };
      await controller.getGroup(req, res, nextMock);
      expect(nextMock.mock.calls).toHaveLength(1);
    });

    it('should call next with correct Error when there is a invalid group id is attached to req params', async () => {
      const controller: GroupController = getGroupController({ group: { get: jest.fn().mockRejectedValue('') }});
      req = { params: {
          id: 'fake-id',
        },
      };

      const msg = 'A group with the specified ID fake-id was not found';
      const error = { message: msg, code: 500, params: { id: 'fake-id' } };
      const expectedError = new Error(JSON.stringify(error));
      nextMock = jest.fn().mockReturnValue(expectedError);

      await controller.getGroup(req, res, nextMock);
      expect(nextMock).toHaveBeenCalledWith(expectedError);
    });

    it('should call res.json once when there is a valid group id', async () => {
      const controller: GroupController = getGroupController();
      req = { params: {
        id: 'test-id-1',
        },
      };

      await controller.getGroup(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with correct args when there is a valid group id', async () => {
      const controller: GroupController = getGroupController();
      req = { params: {
        id: 'test-id-1',
        },
      };

      res.json = jest.fn().mockReturnValue(group);

      await controller.getGroup(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(group);
    });
  });

  describe('create tests', () => {

    it('should call res.status with 404 when promise rejected', async () => {
      const controller: GroupController = getGroupController({ group:
        { createGroup: jest.fn().mockRejectedValue('') },
      });
      req = { body: { name: 'test' } };

      await controller.create(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send with a correct message when promise rejected', async () => {
      const controller: GroupController = getGroupController({ group: {
        createGroup: jest.fn().mockRejectedValue('') },
      });
      req = { body: { name: 'test' } };

      await controller.create(req, res, nextMock);
      expect(res.status().send).toHaveBeenCalledWith('Group information is missing or invalid');
    });

    it('should call res.json once where there is a valid group', async () => {
      const controller: GroupController = getGroupController();
      const newGroup: object = {
        id: 'test-id-1',
        name: 'Test Group',
        permissions: ['DELETE', 'UPLOAD'],
      };
      req = { body: { ...newGroup } };

      await controller.create(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with correct args when there is a valid group', async () => {
      const controller: GroupController = getGroupController();
      const newGroup: object = {
        id: 'test-id-1',
        name: 'Test Group',
        permissions: ['DELETE', 'UPLOAD'],
      };
      req = { body: { ...newGroup } };

      await controller.create(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(group);
    });
  });

  describe('getAllGroups tests', () => {

    it('should call res.status with 404 when a promise rejected', async () => {
      const controller: GroupController = getGroupController({ group: { getAll: jest.fn().mockRejectedValue('') }});

      await controller.getAllGroups(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.json once with a correct message when a promise rejected', async () => {
      const controller: GroupController = getGroupController({ group: { getAll: jest.fn().mockRejectedValue('') }});

      await controller.getAllGroups(req, res, nextMock);
      expect(res.status().send.mock.calls).toHaveLength(1);
      expect(res.status().send).toHaveBeenCalledWith('Something went terribly wrong');
    });

    it('should call res.json once', async () => {
      const controller: GroupController = getGroupController();

      await controller.getAllGroups(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with array of groups', async () => {
      const controller: GroupController = getGroupController();

      await controller.getAllGroups(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(groups);
    });
  });

  describe('deleteGroup tests', () => {

    it('should call res.status once with 500 when no group id is attached to req params', async () => {
      const controller: GroupController = getGroupController({
        group: { deleteGroup: jest.fn().mockRejectedValue('') },
      });
      req = { params: {} };

      await controller.deleteGroup(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should call res.status.send once with a correct message when no group id is attached to req params',
      async () => {
        const controller: GroupController = getGroupController({
          group: { deleteGroup: jest.fn().mockRejectedValue('') },
        });
        req = { params: {} };

        await controller.deleteGroup(req, res, nextMock);
        expect(res.status().send.mock.calls).toHaveLength(1);
        expect(res.status().send).toHaveBeenCalledWith('Fail');
    });

    it('should call res.json once when group id is attached to req params',
      async () => {
        const controller: GroupController = getGroupController();
        req = {
          params: {
            id: 'test-id-1',
          },
        };

        await controller.deleteGroup(req, res, nextMock);
        expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with a correct message when group id is attached to req params',
    async () => {
      const controller: GroupController = getGroupController();
      req = {
        params: {
          id: 'test-id-1',
        },
      };

      await controller.deleteGroup(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith([1]);
    });
  });

  describe('updateGroup tests', () => {

    it('should call res.status once with 404 when no group id is attached to req.params', async () => {
      const controller: GroupController = getGroupController({ group: { updateById: jest.fn().mockRejectedValue('') }});
      req = {
        params: {},
        body: {
          name: 'updated name',
        },
      };

      await controller.updateGroup(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send once with a correct message when no group id is attached to req.params',
    async () => {
      const controller: GroupController = getGroupController({ group: { updateById: jest.fn().mockRejectedValue('') }});
      req = {
        params: {},
        body: {
          name: 'updated name',
        },
      };

      const expectedMessage = `A group with the specified ID undefined was not found`;

      await controller.updateGroup(req, res, nextMock);
      expect(res.status().send.mock.calls).toHaveLength(1);
      expect(res.status().send).toHaveBeenCalledWith(expectedMessage);
    });

    it('should call res.json once when group id is attached to req.params', async () => {
      const newGroup = { ...group, name: 'new name', permissions: ['CREATE'] };
      const controller: GroupController = getGroupController({ group: {
        updateById: jest.fn().mockReturnValue(newGroup) },
      });
      req = {
        params: {
          id: 'test-id-1',
        },
        body: {
          name: 'new name',
          permissions: ['UPLOAD'],
        },
      };

      await controller.updateGroup(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
    });

    it('should call res.json with a correct updated group when group id is attached to req.params', async () => {
      const newGroup = { ...group, name: 'new name', permissions: ['CREATE'] };
      const controller: GroupController = getGroupController({
        group: { updateById: jest.fn().mockReturnValue(newGroup) },
      });
      req = {
        params: {
          id: 'test-id-1',
        },
        body: {
          name: 'new name',
          permissions: ['UPLOAD'],
        },
      };

      await controller.updateGroup(req, res, nextMock);
      expect(res.json).toHaveBeenCalledWith(newGroup);
    });
  });

  describe('addUsersToGroup tests', () => {

    it('should call res.status once with 404 when no group id is attached to req params', async () => {
      const controller: GroupController = getGroupController({ group: {
        addUsersToGroup: jest.fn().mockRejectedValue('')},
      });
      req = {
        params: {},
        body: {
          users: [],
      }};

      await controller.addUsersToGroup(req, res, nextMock);
      expect(res.status.mock.calls).toHaveLength(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should call res.status.send once with a correct message when no group id is attached to req params',
    async () => {
      const controller: GroupController = getGroupController({ group: {
        addUsersToGroup: jest.fn().mockRejectedValue('')},
      });
      req = {
        params: {},
        body: {
          users: [],
      }};

      await controller.addUsersToGroup(req, res, nextMock);
      expect(res.status().send.mock.calls).toHaveLength(1);
      expect(res.status().send).toHaveBeenCalledWith('A users with the specified IDs was not found');
    });

    it('should call data.db.transaction once when group id is attached to req params',
    async () => {
      const controller: GroupController = getGroupController();
      req = {
        params: {
          id: 'test-id-1',
        },
        body: {
          users: ['user-id-1'],
      }};

      await controller.addUsersToGroup(req, res, nextMock);
      expect(data.group.db.transaction.mock.calls).toHaveLength(1);
      expect(data.group.db.transaction).toHaveBeenCalled();
    });

    it('should call res.json once with a correct updated group', async () => {
      const controller: GroupController = getGroupController();
      req = {
        params: {
          id: 'test-id-1',
        },
        body: {
          users: ['user-id-1'],
      }};

      await controller.addUsersToGroup(req, res, nextMock);
      expect(res.json.mock.calls).toHaveLength(1);
      expect(res.json).toHaveBeenCalledWith(group);
    });
  });

});
