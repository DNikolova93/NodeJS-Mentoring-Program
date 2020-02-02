import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { UserStatic } from '../types/user';

export default (sequelize: Sequelize, DataTypes: any) => {
  const Group = sequelize.define('UserGroup', {
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    groupId: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false},
  }) as UserStatic;

  return Group;
};
