import { ValidatedRequestSchema } from 'express-joi-validation';
import { BuildOptions, Model } from 'sequelize';

export type UserGroup = {
  readonly id: string;
  userId: string;
  groupId: string;
};

export type UserGroupRequest = UserGroup & ValidatedRequestSchema;
export class UserGroupModel extends Model {
  public static associate: (model: any) => void;

  public id!: string;
  public userId!: string;
  public groupId!: string;

   // timestamps!
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
}

export type UserGroupStatic = typeof Model
  & (new (values?: object, options?: BuildOptions | undefined) => UserGroupModel);
