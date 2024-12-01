import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { AppConfig } from './app.config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommunityModule } from './community/community.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    AuthModule,
    CommonModule,
    CommunityModule,
    SequelizeModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<ConfigType<typeof AppConfig>>,
      ) => {
        const logger = new Logger('Sequelize');
        return {
          dialect: 'postgres',
          ...configService.get('db', { infer: true }),
          logging: (sql: string): void => logger.verbose(sql),
          autoLoadModels: true,
          synchronize: true,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
