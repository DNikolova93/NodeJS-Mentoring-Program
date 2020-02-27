import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { GroupModel } from '../types/group';

export default (sequelize: Sequelize, DataTypes: any) => {
  GroupModel.init({
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
  }, {
    sequelize,
    tableName: 'Groups',
  });

  GroupModel.associate = (model: any) => {
    model.GroupModel.belongsToMany(model.UserModel, {
      through: 'UserGroupModel',
      foreignKey: 'userId',
      as: 'users',
    });
  };

  return GroupModel;
};
