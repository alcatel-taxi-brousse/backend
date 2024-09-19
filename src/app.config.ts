export const AppConfig = () => ({
  rainbow: {
    host: process.env.RAINBOW_HOST || 'sandbox',
    login: process.env.RAINBOW_LOGIN || 'login',
    password: process.env.RAINBOW_PASSWORD || 'password',
    appID: process.env.RAINBOW_APP_ID || 'appId',
    appSecret: process.env.RAINBOW_APP_SECRET || 'secret',
  },
  logLevel: process.env.LOG_LEVEL || 'log',
  enableSwagger: process.env.ENABLE_SWAGGER
    ? process.env.ENABLE_SWAGGER.toLowerCase() === 'true'
    : false,
});
