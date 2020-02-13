import { ValidatedRequestSchema } from 'express-joi-validation';
import {
  Association,
  BuildOptions,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model } from 'sequelize';
import { GroupModel } from './group';

export type User = {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserRequest = User & ValidatedRequestSchema;

export type UserStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => User);

export class UserModel extends Model {

  public static associations: {
    groups: Association<UserModel, GroupModel>;
  };

  public static associate: (model: any) => void;

  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: false;

   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;

   public getGroup!: HasManyGetAssociationsMixin<GroupModel>;
   public addGroup!: HasManyAddAssociationMixin<GroupModel, number>;
   public hasGroup!: HasManyHasAssociationMixin<GroupModel, number>;
   public countGroups!: HasManyCountAssociationsMixin;
   public createGroup!: HasManyCreateAssociationMixin<GroupModel>;
}
