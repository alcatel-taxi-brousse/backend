## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Environment variables

| Name               | Description                                                                   | Default      |
|--------------------|-------------------------------------------------------------------------------|--------------|
| RAINBOW_HOST       | The rainbow instance to connect to. 'sandbox', 'official' or another instance | `sandbox`    |
| RAINBOW_LOGIN      | The email address used to connect to Rainbow                                  | `login`      |
| RAINBOW_PASSWORD   | Rainbow password                                                              | `password`   |
| RAINBOW_APP_ID     | Rainbow application ID                                                        | `app_id`     |
| RAINBOW_APP_SECRET | Rainbow application secret                                                    | `app_secret` |
| LOG_LEVEL          | A comma separated string of levels to log                                     | `log`        |
| ENABLE_SWAGGER     | Enable Swagger documentation                 | `false`      |


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```