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

import { QuoteDto } from './dto/quote-dto';

@Controller('mail-service')
@ApiTags('Mail Service')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * Function to send mail based on quote data
   * @param quotePayload: IQuoteModel
   * @param response: Response
   */
  @Post('sendmail')
  @ApiOperation({ summary: 'Send email to users' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async sendMail(
    @Body() quotePayload: QuoteDto,
    @Res() response: Response,
  ): Promise<any> {
    this.mailService
      .sendMail(quotePayload)
      .then(() => {
        Logger.log('Email sent successfully', JSON.stringify(quotePayload));
        response.status(HttpStatus.NO_CONTENT).send();
      })
      .catch(err => {
        Logger.log('Error in sending email', JSON.stringify(err));
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Error in sending email');
      });
  }
}
