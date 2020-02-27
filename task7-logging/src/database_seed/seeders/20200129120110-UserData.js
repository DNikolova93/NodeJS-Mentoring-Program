"use strict";

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
        age: amount + 6,
        createdAt: date,
        id: uuid,
        isDeleted: false,
        login: faker.internet.email(),
        password: faker.internet.password(),
        updatedAt: date,
      });
    }

    return queryInterface.bulkInsert("Users", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
