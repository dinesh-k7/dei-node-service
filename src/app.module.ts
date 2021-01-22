import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

import { MailModule } from './mail/mail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

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
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: SECURE ? SECURE_PORT : EMAIL_PORT,
        secure: SECURE, // true for 465, false for other ports
        auth: {
          user: EMAIL_ID,
          pass: EMAIL_PASS,
        },
      },
      defaults: {
        from: EMAIL_FROM, // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
