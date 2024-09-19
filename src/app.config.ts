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
  logLevel: process.env.LOG_LEVEL || 'log',
});
