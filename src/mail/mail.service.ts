import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { IBrandingQuoteModel, IQuoteModel } from './model/quote.model';
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
    quote: IQuoteModel | IBrandingQuoteModel,
    page?: string,
  ): Promise<any> {
    quote = sanitizeInput({ ...quote });
    const from = this.configService.get<string>(
      'EMAIL_CONFIGURATION.EMAIL_FROM',
    );
    const { subject, template } = this.getSubjectTempl(page, quote);

    const { email } = quote;
    const to = page === constants.DATA_SECURITY ? email : from;

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

      case constants.LEAD_INFO:
        if (quote['slogan']) {
          subject = this.configService.get<string>(
            'EMAIL_CONFIGURATION.BRANDING_DEALS_SUBJECT',
          );
        } else {
          subject = this.configService.get<string>(
            'EMAIL_CONFIGURATION.LEAD_EMAIL_SUBJECT',
          );
        }
        template = 'lead-info';
        break;
    }
    return { subject, template };
  }
}
