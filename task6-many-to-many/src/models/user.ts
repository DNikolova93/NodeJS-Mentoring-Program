import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { GroupModel } from '../types/group';
import { UserModel } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {
  const User = UserModel.init({
    id: { type: DataTypes.UUID,  defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, validate: { isAlphanumeric: true }, allowNull: false},
    age: { type: DataTypes.INTEGER, validate: { min: 3, max: 130 }, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN },
  }, {
    sequelize,
    tableName: 'Users',
  });

  UserModel.hasMany(GroupModel, {
    sourceKey: 'id',
    foreignKey: 'groupId',
    as: 'groups',
  });

  return User;
};
