import * as dotenv from 'dotenv';
import { merge } from 'lodash';

let path: string;
dotenv.config();

switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/environments/.env.production`;
    break;
  default:
    path = `${__dirname}/environments/.env.development`;
}

dotenv.config({ path });

const config = {
    dev: 'development',
    prod: 'production',
    port: process.env.PORT || 3001,
    env: '',
    logging: false,
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

let envConfig;

try {
    // tslint:disable-next-line:no-var-requires
    envConfig = require('./' + config.env)[config.env];
    envConfig = envConfig || {};
} catch (error) {
    envConfig = {};
}

export const development = envConfig.connectionOptions;

export const test = envConfig.connectionOptions;

export const production = envConfig.connectionOptions;

export const CONFIG = merge(config, envConfig);
