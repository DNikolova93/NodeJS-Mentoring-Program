import { ValidatedRequestSchema } from 'express-joi-validation';
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BuildOptions,
  Model } from 'sequelize';
import { GroupModel } from './group';

export type User = {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  groups: string[]; 
};

export type UserRequest = User & ValidatedRequestSchema;

export type UserStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => UserModel);

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
  public groups!: string[];

   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;

   public getGroup!: BelongsToManyGetAssociationsMixin<GroupModel>;
   public addGroup!: BelongsToManyAddAssociationMixin<GroupModel, string>;
   public hasGroup!: BelongsToManyHasAssociationMixin<GroupModel, string>;
   public countGroups!: BelongsToManyCountAssociationsMixin;
   public createGroup!: BelongsToManyCreateAssociationMixin<GroupModel>;
}
