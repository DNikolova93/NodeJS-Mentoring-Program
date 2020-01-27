import { merge } from 'lodash';

const config = {
    dev: 'development',
    prod: 'production',
    port: process.env.PORT || 3001,
    cookie: {
        secret: process.env.COOKIE_SECRET || 'Very Secret Much WoW',
        expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    env: '',
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

export const CONFIG = merge(config, envConfig);
