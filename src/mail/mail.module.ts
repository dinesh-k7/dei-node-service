import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { HubspotCrmService } from '../hubspot-crm/hubspot-crm.service';

@Module({
  controllers: [MailController],
  providers: [MailService, HubspotCrmService],
})
export class MailModule {}
