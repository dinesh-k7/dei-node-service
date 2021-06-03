import { Module, HttpModule } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from './mail/mail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubspotCrmController } from './hubspot-crm/hubspot-crm.controller';
import { HubspotCrmService } from './hubspot-crm/hubspot-crm.service';
import { HubspotCrmModule } from './hubspot-crm/hubspot-crm.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  SECURE_PORT,
  SECURE,
  EMAIL_ID,
  EMAIL_PASS,
  EMAIL_FROM,
} = configuration().EMAIL_CONFIGURATION;

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: SECURE ? SECURE_PORT : EMAIL_PORT,
        secure: SECURE, // true for 465, false for other ports
        debug: true,
        // service: 'Godaddy',
        auth: {
          user: EMAIL_ID,
          pass: EMAIL_PASS,
        },
      },
      defaults: {
        from: EMAIL_FROM, // outgoing email ID
      },

      template: {
        dir: join(__dirname, 'mail/templates'),
        adapter: new HandlebarsAdapter(),

        options: {
          strict: true,
        },
      },
    }),
    MailModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HubspotCrmModule,
    HttpModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [AppController, HubspotCrmController],
  providers: [AppService, HubspotCrmService],
})
export class AppModule {}
