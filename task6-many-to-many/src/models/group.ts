import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { GroupModel } from '../types/group';

export default (sequelize: Sequelize, DataTypes: any) => {

  const Group = GroupModel.init({
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
  }, {
    sequelize,
    tableName: 'Groups',
  });

  GroupModel.associate = (model: any) => {
    GroupModel.belongsToMany(model.UserModel, {
      through: 'UserGroup',
      foreignKey: 'userId',
      as: 'users',
    });
  };

  return Group;
};
