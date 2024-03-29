import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LeadsDto } from './dto/leads-dto';

/* eslint-disable @typescript-eslint/no-var-requires */

const hubspot = require('@hubspot/api-client');

@Injectable()
export class HubspotCrmService {
  public hubspotClient;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('HUBSPOT_API_KEY');
    this.hubspotClient = new hubspot.Client({
      apiKey: apiKey,
    });
  }

  /**
   * Function to create leads data in Hubspot CRM
   * @param leadsPayload: LeadsDto
   */
  public async createLead(leadsPayload: LeadsDto): Promise<any> {
    return this.hubspotClient.crm.contacts.basicApi.create({
      properties: leadsPayload,
    });
  }
}
