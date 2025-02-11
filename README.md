## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment variables

| Name               | Description                                                                   | Default       |
|--------------------|-------------------------------------------------------------------------------|---------------|
| RAINBOW_HOST       | The rainbow instance to connect to. 'sandbox', 'official' or another instance | `sandbox`     |
| RAINBOW_LOGIN      | The email address used to connect to Rainbow                                  | `login`       |
| RAINBOW_PASSWORD   | Rainbow password                                                              | `password`    |
| RAINBOW_APP_ID     | Rainbow application ID                                                        | `app_id`      |
| RAINBOW_APP_SECRET | Rainbow application secret                                                    | `app_secret`  |
| LOG_LEVEL          | A comma separated string of levels to log                                     | `log`         |
| ENABLE_SWAGGER     | Enable Swagger documentation                                                  | `false`       |
| DB_USER            | DB Username                                                                   | `taxibrousse` |
| DB_PASSWORD        | DB Password                                                                   | `rainbow`     |
| DB_NAME            | DB Name                                                                       | `taxibrousse` |
| DB_HOST            | DB Host                                                                       | `localhost`   |
| DB_PORT            | BD Port                                                                       | `5432`        |


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
