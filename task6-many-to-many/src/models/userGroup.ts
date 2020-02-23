import { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';
import { UserGroupModel } from '../types/userGroup';

export default (sequelize: Sequelize, DataTypes: any) => {
  UserGroupModel.init({
    id: { type: DataTypes.UUID, defaultValue: () => uuid(), allowNull: false, primaryKey: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'UserGroup',
  });

  return UserGroupModel;
};
