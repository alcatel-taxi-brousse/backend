export const AppConfig = () => ({
  rainbow: {
    host: process.env.RAINBOW_HOST || 'sandbox',
    login: process.env.RAINBOW_LOGIN || 'login',
    password: process.env.RAINBOW_PASSWORD || 'password',
    appID: process.env.RAINBOW_APP_ID || 'appId',
    appSecret: process.env.RAINBOW_APP_SECRET || 'secret',
  },
});
