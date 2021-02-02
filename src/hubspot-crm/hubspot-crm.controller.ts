import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { HubspotCrmService } from './hubspot-crm.service';
import { LeadsDto } from './dto/leads-dto';

@Controller('hubspot-crm')
export class HubspotCrmController {
  constructor(private readonly hubspotCrmService: HubspotCrmService) {}

  /**
   * Function to create a lead contact in HubSpot
   * @param leadsPayload: LeadsDto
   * @param response: Response
   */
  @Post('contacts')
  @ApiOperation({ summary: 'Create leads in HubSpot CRM' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiTags('HubSpot')
  public async createLead(
    @Body() leadsPayload: LeadsDto,
    @Res() response: Response,
  ): Promise<any> {
    this.hubspotCrmService
      .createLead(leadsPayload)
      .then(() => {
        Logger.log('Leads created successfully.');
        response.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(err => {
        console.log(err);
        Logger.log('Error in creating leads', JSON.stringify(err));
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in creating leads');
      });
  }
}
