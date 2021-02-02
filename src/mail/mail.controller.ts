import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MailService } from './mail.service';

import { DataSecurityQuoteDto } from './dto/data-security-quote-dto';
import { BrandingQuoteDto } from './dto/branding-quote-dto';
import { constants } from '../constants';
import { IBrandingQuoteModel, IQuoteModel } from './model/quote.model';
import { HubspotCrmService } from '../hubspot-crm/hubspot-crm.service';

@Controller('mail-service')
@ApiTags('Mail Service')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly hubspotCrmService: HubspotCrmService,
  ) {}

  /**
   * Function to send mail based on quote data
   * @param quotePayload: DataSecurityQuoteDto
   * @param response: Response
   */
  @Post('sendmail')
  @ApiOperation({ summary: 'Send email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendMail(
    @Body() quotePayload: DataSecurityQuoteDto,
    @Res() response: Response,
  ): Promise<any> {
    this.mailService
      .sendMail(quotePayload, constants.confirmation)
      .then(() => {
        Logger.log('Email sent successfully');

        if (quotePayload.companySize) {
          this.createLead(quotePayload);
        }
        this.sendLeadInfoMail(quotePayload);
        response.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(err => {
        Logger.log('Error in sending email', JSON.stringify(err));
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending email');
      });
  }

  /**
   * Function to send email with lead information
   * @param quotePayload: IQuoteModel | IBrandingQuoteModel
   */
  private async sendLeadInfoMail(
    quotePayload: IQuoteModel | IBrandingQuoteModel,
  ): Promise<any> {
    return this.mailService
      .sendMail(quotePayload, constants.leader_info)
      .catch(error => {
        Logger.error('Error in sending Lead Info email', JSON.stringify(error));
      });
  }

  /**
   * Function to send mail based on branding quote data
   * @param quotePayload: BrandingQuoteDto
   * @param response: Response
   */
  @Post('branding-quote/sendmail')
  @ApiOperation({ summary: 'Send Branding Quote email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendBrandingQuote(
    @Body() quotePayload: BrandingQuoteDto,
    @Res() response: Response,
  ): Promise<any> {
    this.mailService
      .sendMail(quotePayload, constants.confirmation)
      .then(() => {
        Logger.log('Email sent successfully');
        this.sendLeadInfoMail(quotePayload);
        response.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(err => {
        Logger.log('Error in sending email', JSON.stringify(err));
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending email');
      });
  }

  /**
   * Function to create leads in Hubspot
   * @param leadsPayoad:IQuoteModel
   */
  private async createLead(payload: IQuoteModel): Promise<any> {
    const { name, lastname, email, phone, websiteUrl, companyName } = payload;
    const leadPayload = {
      firstname: name,
      lastname,
      email,
      phone,
      website: websiteUrl,
      company: companyName,
    };
    this.hubspotCrmService.createLead(leadPayload);
  }
}
