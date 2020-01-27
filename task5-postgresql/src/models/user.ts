import { Sequelize} from 'sequelize';
import uuid from 'uuid';

export default (sequelize: Sequelize, DataTypes: any) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.UUID,  defaultValue: uuid.v1(), allowNull: false, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, validate: { isAlphanumeric: true }, allowNull: false},
    age: { type: DataTypes.INTEGER, validate: { min: 3, max: 130 }, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  });

  return User;
};
