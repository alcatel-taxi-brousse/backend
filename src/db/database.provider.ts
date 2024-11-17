import { Sequelize } from 'sequelize-typescript';
import { Logger, Provider } from '@nestjs/common';
import User from './models/User.model';
import Group from './models/Group.model';
import Trip from './models/Trip.model';
import User_Group from './models/UserGroup.model';
import Group_Trip from './models/GroupTrip.model';
import User_Trip from './models/UserTrip.model';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from '../app.config';

export const databaseProvider: Provider = {
  provide: 'SEQUELIZE',
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService<ConfigType<typeof AppConfig>>,
  ): Promise<Sequelize> => {
    const logger = new Logger(Sequelize.name);
    const dbConfig = configService.get('db', { infer: true });

    const sequelize = new Sequelize({
      dialect: 'postgres',
      logging: false,
      ...dbConfig,
    });

    sequelize.addModels([User, Group, Trip, User_Group, Group_Trip, User_Trip]);

    try {
      await sequelize.sync({ alter: true });
      logger.log('Database schema synchronized successfully.');
    } catch (error) {
      logger.error('Error synchronizing the database schema:', error);
      throw error;
    }

    return sequelize;
  },
};
