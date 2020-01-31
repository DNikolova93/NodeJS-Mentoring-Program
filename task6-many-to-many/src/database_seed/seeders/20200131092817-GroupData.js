'use strict';

const uuidv4 = require("uuid/v4");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [];
    let amount = 50;

    while (amount--) {
      const uuid = uuidv4();
      const date = new Date();

      data.push({
        createdAt: date,
        id: uuid,
        name: faker.name.firstName(),
        permissions: ['DELETE', 'WRITE', 'READ', 'SHARE', 'UPLOAD_FILES'],
        updatedAt: date,
      });
    }

    return queryInterface.bulkInsert("Groups", data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
