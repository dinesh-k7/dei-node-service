import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('Swagger')
  .setDescription('DEI App Rest API Microservices')
  .setVersion('1.0')
  .build();
