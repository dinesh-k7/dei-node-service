import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { IQuoteModel } from './model/quote.model';
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
   * @param quote:IQuoteModel
   * @param action:string
   */
  public sendMail(quote: IQuoteModel, action: string): Promise<any> {
    quote = sanitizeInput({ ...quote });
    const from = this.configService.get<string>(
      'EMAIL_CONFIGURATION.EMAIL_FROM',
    );
    const subject =
      action === constants.confirmation
        ? this.configService.get<string>(
            'EMAIL_CONFIGURATION.CONFIRMATION_EMAIL_SUBJECT',
          )
        : this.configService.get<string>(
            'EMAIL_CONFIGURATION.LEAD_EMAIL_SUBJECT',
          );

    const { email } = quote;
    const to = action === constants.confirmation ? email : from;

    return this.mailerService.sendMail({
      to,
      from,
      cc: from,
      subject,
      template: action === constants.confirmation ? 'index' : 'lead-info',
      context: {
        ...quote,
      },
    });
  }
}
