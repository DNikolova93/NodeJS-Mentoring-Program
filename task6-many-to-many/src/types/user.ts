import { ValidatedRequestSchema } from 'express-joi-validation';
import { BuildOptions, Model} from 'sequelize/types';

export type User = {
  readonly id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserRequest = User & ValidatedRequestSchema;

export type UserStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => User);
