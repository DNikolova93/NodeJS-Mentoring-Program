import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { UserStatic } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {
  const Group = sequelize.define('UserGroup', {
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    groupId: { type: DataTypes.UUID, allowNull: false},
  }) as UserStatic;

  return Group;
};
