import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './common/services/app-logger.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app.config';
import { INestApplication, LogLevel, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService =
    app.get<ConfigService<ConfigType<typeof AppConfig>>>(ConfigService);

  const logLevels = configService
    .get<string>('logLevel')
    .split(',') as LogLevel[];
  const logger = new AppLogger();
  logger.setLogLevels(logLevels);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger);
  const enableSwagger = configService.get('enableSwagger', { infer: true });
  if (enableSwagger) {
    enableSwaggerEndpoint(app);
  }

  await app.listen(3000);
}

function enableSwaggerEndpoint(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Taxi-Brousse API')
    .setDescription('An API to connect Rainbow API and Taxi-Brousse client')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
