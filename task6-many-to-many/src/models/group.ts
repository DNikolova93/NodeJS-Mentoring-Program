import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { UserStatic } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {
  const User = sequelize.define('Group', {
    id: { type: DataTypes.UUID,  defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    permissions: { type: DataTypes.ARRAY, allowNull: false},
  }) as UserStatic;

  return User;
};
