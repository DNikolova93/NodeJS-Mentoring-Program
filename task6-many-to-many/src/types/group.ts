export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
import { BuildOptions, Model } from 'sequelize/types';

export type Group = {
  readonly id: string;
  name: string;
  permissions: Permission[];
};

export type GroupStatic = typeof Model & (new (values?: object, options?: BuildOptions | undefined) => User);
