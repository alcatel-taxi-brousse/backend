import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/services/app-logger.service';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const logLevels = configService
    .get<string>('logLevel')
    .split(',') as LogLevel[];
  const logger = new AppLogger();
  logger.setLogLevels(logLevels);
  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
