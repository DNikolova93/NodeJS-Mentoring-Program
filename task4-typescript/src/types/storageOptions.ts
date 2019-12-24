export type StorageOptions = {
  dir: string;
  encoding: 'utf8';
  logging: boolean;
  expiredInterval: number;
  forgiveParseErrors: boolean;
  saveToDir: boolean;
  ttl: boolean;
};
