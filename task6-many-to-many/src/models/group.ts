import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { GroupModel } from '../types/group';
import { UserModel } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {

  const Group = GroupModel.init({
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
  }, {
    sequelize,
    tableName: 'Groups',
  });

  GroupModel.hasMany(UserModel, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'users',
  });

  return Group;
};
