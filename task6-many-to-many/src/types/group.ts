export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
import {
  Association,
  BuildOptions,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model } from 'sequelize';
import { UserModel } from './user';

export type Group = {
  readonly id: string;
  name: string;
  permissions: Permission[];
};

export class GroupModel extends Model {
  public static associations: {
    users: Association<GroupModel, UserModel>;
  };

  public id!: string;
  public name!: string;
  public permissions!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: HasManyGetAssociationsMixin<UserModel>;
  public addUser!: HasManyAddAssociationMixin<UserModel, number>;
  public hasUser!: HasManyHasAssociationMixin<UserModel, number>;
  public countUsers!: HasManyCountAssociationsMixin;
  public createUser!: HasManyCreateAssociationMixin<UserModel>;
}

export type GroupStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => Group);
