import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import config from './config/configuration';

import { AllExceptionsFilter } from './shared/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config().PORT || 3010;

  // Initialize helmet to prevent from some well-known web vulnerabilities
  app.use(helmet());

  // Enable validation based on DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // A common technique to protect applications from brute-force attack
  app.use(
    rateLimit({
      windowMs: (config().RATE_LIMIT.minutes || 10) * 60 * 1000, // 10 minutes
      max: config().RATE_LIMIT.max || 100, // limit each IP to no of requests per windowMs from configuration file
    }),
  );

  // Enable HTTP Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  if (config().ENABLE_CORS) {
    app.enableCors();
  }

  await app.listen(port);
}
bootstrap();
