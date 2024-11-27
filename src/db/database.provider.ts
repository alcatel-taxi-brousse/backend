import { Sequelize } from 'sequelize-typescript';
import { Logger, Provider } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Group } from './entities/group.entity';
import { Trip } from './entities/trip.entity';
import { GroupTrip } from './entities/group-trip.entity';
import { UserTrip } from './entities/user-trip.entity';
import { UserGroup } from './entities/user-group.entity';
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

    sequelize.addModels([User, Group, Trip, UserGroup, GroupTrip, UserTrip]);

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
