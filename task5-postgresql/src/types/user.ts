import { ValidatedRequestSchema } from 'express-joi-validation';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export type UserRequest = User & ValidatedRequestSchema;
