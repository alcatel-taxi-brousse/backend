const hosts = {
  sandbox: 'sandbox.openrainbow.com',
  official: 'openrainbow.com',
};

export const AppConfig = () => ({
  rainbow: {
    host:
      (hosts[process.env.RAINBOW_HOST] || process.env.RAINBOW_HOST) ??
      'sandbox.openrainbow.com',
    appID: process.env.RAINBOW_APP_ID || 'appId',
    appSecret: process.env.RAINBOW_APP_SECRET || 'secret',
  },
  logLevel: process.env.LOG_LEVEL || 'log',
  enableSwagger: process.env.ENABLE_SWAGGER
    ? process.env.ENABLE_SWAGGER.toLowerCase() === 'true'
    : false,
});
