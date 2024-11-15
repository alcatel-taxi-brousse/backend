import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeSDK as RainbowSDK } from 'rainbow-node-sdk/lib/NodeSDK';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './app.config';
import { config as defaultRainbowConfig } from 'rainbow-node-sdk/lib/config/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { TripController } from './trip/trip.controller';
import { Sequelize } from 'sequelize-typescript';
import * as pgtools from 'pgtools';
import User from './db/models/User';
import Group from './db/models/Group';
import Trip from './db/models/Trip';
import User_Group from './db/models/UserGroup';
import Group_Trip from './db/models/GroupTrip';
import User_Trip from './db/models/UserTrip';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
  ],
  controllers: [
    AppController,
    UserController,
    GroupController,
    TripController,
  ],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: RainbowSDK,
      useFactory: async (
        service: ConfigService<ConfigType<typeof AppConfig>>,
      ) => {
        const logger = new Logger('RainbowSDK');
        const appConfig = service.get('rainbow', { infer: true });
        const rainbowConfig = {
          ...defaultRainbowConfig,
          rainbow: {
            host: appConfig.host,
          },
          credentials: {
            login: appConfig.login,
            password: appConfig.password,
          },
          application: {
            appID: appConfig.appID,
            appSecret: appConfig.appSecret,
          },
          webinar: {
            start_up: false,
          },
          rbvoice: {
            start_up: false,
          },
          rpcoverxmpp: {
            start_up: false,
          },
        };
        const sdk = new RainbowSDK(rainbowConfig);
        await sdk.start();
        logger.log(`Connected to ${appConfig.host}`);
        return sdk;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);
  private sequelize: Sequelize;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    const dbName = 'taxibrousse';
    const dbConfig = {
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
    };

    try {
      await pgtools.createdb(dbConfig, dbName);
      this.logger.log(`Database "${dbName}" created successfully.`);
    } catch (err: any) {
      if (err.name === 'duplicate_database') {
        this.logger.log(`Database "${dbName}" already exists.`);
      } else {
        this.logger.error('Error creating the database:', err);
        throw err; 
      }
    }

    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbName,
      logging: false, 
    });

    this.sequelize.addModels([User, Group, Trip, User_Group, Group_Trip, User_Trip]);

    try {
      await this.sequelize.sync({ alter: true });
      this.logger.log('Database schema synchronized successfully.');
    } catch (error) {
      this.logger.error('Error synchronizing the database schema:', error);
      throw error;
    }
  }
}