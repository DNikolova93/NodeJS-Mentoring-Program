export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BuildOptions,
  Model } from 'sequelize';
import { UserModel } from './user';

export type Group = {
  readonly id: string;
  name: string;
  permissions: Permission[];
  users: string[];
};

export class GroupModel extends Model {
  public static associations: {
    users: Association<GroupModel, UserModel>;
  };

  public static associate: (model: any) => void;

  public id!: string;
  public name!: string;
  public permissions!: string[];
  public users!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToManyGetAssociationsMixin<string>;
  public addUser!: BelongsToManyAddAssociationMixin<string[], string>;
  public hasUser!: BelongsToManyHasAssociationMixin<UserModel, string>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public createUser!: BelongsToManyCreateAssociationMixin<UserModel>;
}

export type GroupStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => GroupModel);
