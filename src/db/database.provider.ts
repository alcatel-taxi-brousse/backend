import { Sequelize } from 'sequelize-typescript';
import * as pgtools from 'pgtools';
import { Logger } from '@nestjs/common';
import User from './models/User.model';
import Group from './models/Group.model';
import Trip from './models/Trip.model';
import User_Group from './models/UserGroup.model';
import Group_Trip from './models/GroupTrip.model';
import User_Trip from './models/UserTrip.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (): Promise<Sequelize> => {
      const logger = new Logger('DatabaseProvider');
      const dbName = 'taxibrousse';
      const dbConfig = {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
      };

      try {
        await pgtools.createdb(dbConfig, dbName);
        logger.log(`Database "${dbName}" created successfully.`);
      } catch (err: any) {
        if (err.name === 'duplicate_database') {
          logger.log(`Database "${dbName}" already exists.`);
        } else {
          logger.error('Error creating the database:', err);
          throw err;
        }
      }

      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbName,
        logging: false,
      });

      sequelize.addModels([
        User,
        Group,
        Trip,
        User_Group,
        Group_Trip,
        User_Trip,
      ]);

      try {
        await sequelize.sync({ alter: true });
        logger.log('Database schema synchronized successfully.');
      } catch (error) {
        logger.error('Error synchronizing the database schema:', error);
        throw error;
      }

      return sequelize;
    },
  },
];
