import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { UserStatic } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID,  defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, validate: { isAlphanumeric: true }, allowNull: false},
    age: { type: DataTypes.INTEGER, validate: { min: 3, max: 130 }, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN },
  }) as UserStatic;

  return User;
};
