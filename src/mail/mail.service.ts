import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { IQuoteModel } from './model/quote.model';
import { sanitizeInput } from '../shared/utils';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Function to send mail to users with lead information
   * @param quote:IQuoteModel
   */
  public sendMail(quote: IQuoteModel): Promise<any> {
    quote = sanitizeInput({ ...quote });
    const from = this.configService.get<string>(
      'EMAIL_CONFIGURATION.EMAIL_FROM',
    );
    const subject = this.configService.get<string>(
      'EMAIL_CONFIGURATION.EMAIL_SUBJECT',
    );
    const { email } = quote;

    return this.mailerService.sendMail({
      to: email,
      from,
      cc: from,
      subject,
      template: 'index',
      context: {
        ...quote,
      },
    });
  }
}
