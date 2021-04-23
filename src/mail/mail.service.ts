import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import {
  IBrandingQuoteModel,
  IEnterpriseServiceModel,
  IQuoteModel,
  ISDWANServiceModel,
} from './model/quote.model';
import { sanitizeInput } from '../shared/utils';
import { constants } from '../constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Function to send mail to users with lead information
   * @param quote:IQuoteModel | IBrandingQuoteModel
   * @param page:string
   */
  public sendMail(
    quote:
      | IQuoteModel
      | IBrandingQuoteModel
      | IEnterpriseServiceModel
      | ISDWANServiceModel,
    page?: string,
  ): Promise<any> {
    quote = sanitizeInput({ ...quote });
    const from = this.configService.get<string>(
      'EMAIL_CONFIGURATION.EMAIL_FROM',
    );
    const { subject, template } = this.getSubjectTempl(page, quote);

    const { email } = quote;
    const to = page === constants.LEAD_INFO ? from : email;

    return this.mailerService.sendMail({
      to,
      from,
      cc: from,
      subject,
      template,
      context: {
        ...quote,
      },
    });
  }

  /**
   * Function to return the subject for the email
   * @param page: string
   * @param quote: any
   */
  private getSubjectTempl(
    page: string,
    quote?: any,
  ): { subject: string; template: string } {
    let subject;
    let template;
    switch (page) {
      case constants.BRANDING:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.BRANDING_EMAIL_SUBJECT',
        );
        template = 'branding-quote';
        break;

      case constants.DATA_SECURITY:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'index';
        break;

      case constants.ES_CLOUD_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.CLOUD_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'cloud-service-quote';
        break;

      case constants.CONSULTATION_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.CONSULTATION_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'consultation-service-quote';
        break;

      case constants.ES_DATA_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.DATA_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'data-service-quote';
        break;

      case constants.ES_VOICE_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.VOICE_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'voice-service-quote';
        break;

      case constants.ES_SECURITY_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.SECURITY_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'security-service-quote';
        break;

      case constants.ES_IOT_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.IOT_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'iot-service-quote';
        break;

      case constants.ES_PROFESSIONAL_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.PROFESSIONAL_SERVICE_CONFIRMATION_EMAIL_SUBJECT',
        );
        template = 'professional-service-quote';
        break;

      case constants.LEAD_INFO:
        const { fromPage } = quote;
        if (quote['slogan']) {
          subject = this.configService.get<string>(
            'EMAIL_CONFIGURATION.BRANDING_DEALS_SUBJECT',
          );
        } else {
          subject = this.getLeadInfoSubject(fromPage);
        }
        template = 'lead-info';
        break;
    }
    return { subject, template };
  }

  /**
   * Function to return the subject for the leadinfo email
   * @param page: string
   */
  private getLeadInfoSubject(page: string): string {
    let subject;

    switch (page) {
      case constants.ES_DATA_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.DATA_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.ES_CLOUD_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.CLOUD_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.ES_SECURITY_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.SECURITY_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.ES_IOT_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.IOT_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.ES_VOICE_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.VOICE_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.ES_PROFESSIONAL_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.PROFESSIONAL_LEAD_EMAIL_SUBJECT',
        );
        break;
      case constants.CONSULTATION_SERVICE:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.CONSULTATION_LEAD_EMAIL_SUBJECT',
        );
        break;

      default:
        subject = this.configService.get<string>(
          'EMAIL_CONFIGURATION.LEAD_EMAIL_SUBJECT',
        );
        break;
    }
    return subject;
  }
}
