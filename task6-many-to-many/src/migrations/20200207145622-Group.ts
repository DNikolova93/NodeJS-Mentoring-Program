export default {
  up: (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      permissions: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface: any, Sequelize: any) => {
    return queryInterface.dropTable('Groups');
  },
};
