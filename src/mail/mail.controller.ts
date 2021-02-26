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
import {
  IBrandingQuoteModel,
  IEnterpriseServiceModel,
  IQuoteModel,
  ISDWANServiceModel,
} from './model/quote.model';
import { HubspotCrmService } from '../hubspot-crm/hubspot-crm.service';
import { EnterpriseServiceQuoteDto } from './dto/enterprise-service-quote-dto';
import { SDWANServiceQuoteDto } from './dto/sdwan-service-quote-dto';
import { ConsultationServiceQuoteDto } from './dto/consultation-service-quote-dto';

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
      .sendMail(quotePayload, constants.DATA_SECURITY)
      .then(() => {
        Logger.log('Email sent successfully');

        this.createLead(quotePayload);
        this.sendLeadInfoMail(quotePayload);
        response.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(err => {
        Logger.log('Error in sending data security email', JSON.stringify(err));
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
    quotePayload:
      | IQuoteModel
      | IBrandingQuoteModel
      | IEnterpriseServiceModel
      | ISDWANServiceModel,
  ): Promise<any> {
    return this.mailService
      .sendMail(quotePayload, constants.LEAD_INFO)
      .catch(error => {
        Logger.error('Error in sending Lead Info email', JSON.stringify(error));
      });
  }

  /**
   * Function to send mail based on branding quote data
   * @param brandingPayload: BrandingQuoteDto
   * @param res: Response
   */
  @Post('branding-quote/sendmail')
  @ApiOperation({ summary: 'Send Branding Quote email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendBrandingQuote(
    @Body() brandingPayload: BrandingQuoteDto,
    @Res() res: Response,
  ): Promise<any> {
    this.mailService
      .sendMail(brandingPayload, constants.BRANDING)
      .then(() => {
        Logger.log('Branding quote Email sent successfully');
        this.createLead(brandingPayload);
        this.sendLeadInfoMail(brandingPayload);
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(brandingErr => {
        Logger.log(
          'Error in sending Branding email',
          JSON.stringify(brandingErr),
        );
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending Branding email');
      });
  }

  /**
   * Function to create leads in Hubspot
   * @param leadsPayoad:IQuoteModel
   */
  private async createLead(payload: any): Promise<any> {
    const { name, lastname, email, phone, websiteUrl, companyName } = payload;
    const leadPayload = {
      firstname: name,
      lastname,
      email,
      phone,
      website: websiteUrl ? websiteUrl : '',
      company: companyName,
    };
    this.hubspotCrmService.createLead(leadPayload).then(
      data => {
        Logger.log('Successfully created leads', JSON.stringify(data));
      },
      error => {
        Logger.log('Error in creating leads', JSON.stringify(error));
      },
    );
  }

  /**
   * Function to send mail based on cloud service quote data
   * @param enterpriseServicePayload: EnterpriseServiceQuoteDto
   * @param res: Response
   */
  @Post('enterprise-service/sendmail')
  @ApiOperation({ summary: 'Send Enterprise Quote email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendESQuote(
    @Body() enterpriseServicePayload: EnterpriseServiceQuoteDto,
    @Res() res: Response,
  ): Promise<any> {
    const { fromPage } = enterpriseServicePayload;
    this.mailService
      .sendMail(enterpriseServicePayload, fromPage)
      .then(() => {
        Logger.log('Enterprise quote Email sent successfully');
        // this.createLead(enterpriseServicePayload);
        this.sendLeadInfoMail(enterpriseServicePayload);
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(esErr => {
        Logger.log(
          'Error in sending Enterprise service email',
          JSON.stringify(esErr),
        );
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending Enterprise service email');
      });
  }

  /**
   * Function to send mail based on sdwan quote data
   * @param SDWANServicePayload: SDWANServiceQuoteDto
   * @param res: Response
   */
  @Post('sdwan-service/sendmail')
  @ApiOperation({ summary: 'Send SDWAN Service Quote email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendSDWANQuote(
    @Body() SDWANServicePayload: SDWANServiceQuoteDto,
    @Res() res: Response,
  ): Promise<any> {
    const { fromPage } = SDWANServicePayload;
    this.mailService
      .sendMail(SDWANServicePayload, fromPage)
      .then(() => {
        Logger.log('SDWAN quote Email sent successfully');
        // this.createLead(enterpriseServicePayload);
        this.sendLeadInfoMail(SDWANServicePayload);
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(esErr => {
        Logger.log(
          'Error in sending SDWAN service email',
          JSON.stringify(esErr),
        );
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending SDWAN service email');
      });
  }

  /**
   * Function to send mail based on consultation quote data
   * @param consultationServicePayload: ConsultationServiceQuoteDto
   * @param res: Response
   */
  @Post('consultation-service/sendmail')
  @ApiOperation({ summary: 'Send Consultation Service Quote email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendConsultationQuote(
    @Body() consultationServicePayload: ConsultationServiceQuoteDto,
    @Res() res: Response,
  ): Promise<any> {
    const { fromPage } = consultationServicePayload;
    this.mailService
      .sendMail(consultationServicePayload, fromPage)
      .then(() => {
        Logger.log('Consultation quote Email sent successfully');
        // this.createLead(enterpriseServicePayload);
        this.sendLeadInfoMail(consultationServicePayload);
        res.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(cErr => {
        Logger.log(
          'Error in sending Consultation service email',
          JSON.stringify(cErr),
        );
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending Consultation service email');
      });
  }
}
