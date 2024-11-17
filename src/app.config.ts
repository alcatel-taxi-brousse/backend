import * as process from 'node:process';

const hosts = {
  sandbox: 'sandbox.openrainbow.com',
  official: 'openrainbow.com',
};

export const AppConfig = () => ({
  rainbow: {
    host:
      (hosts[process.env.RAINBOW_HOST] || process.env.RAINBOW_HOST) ??
      'sandbox.openrainbow.com',
    login: process.env.RAINBOW_LOGIN || 'login',
    password: process.env.RAINBOW_PASSWORD || 'password',
    appID: process.env.RAINBOW_APP_ID || 'appId',
    appSecret: process.env.RAINBOW_APP_SECRET || 'secret',
  },
  db: {
    username: process.env.DB_USER || 'taxibrousse',
    password: process.env.DB_PASSWORD || 'rainbow',
    database: process.env.DB_NAME || 'taxibrousse',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
  },
  logLevel: process.env.LOG_LEVEL || 'log',
  enableSwagger: process.env.ENABLE_SWAGGER
    ? process.env.ENABLE_SWAGGER.toLowerCase() === 'true'
    : false,
});
