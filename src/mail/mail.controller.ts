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
import { constants } from '../constants';
import { IQuoteModel } from './model/quote.model';

@Controller('mail-service')
@ApiTags('Mail Service')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * Function to send mail based on quote data
   * @param quotePayload: QuoteDto
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
      .sendMail(quotePayload, constants.confirmation)
      .then(() => {
        Logger.log('Email sent successfully', JSON.stringify(quotePayload));
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
   * @param quotePayload: IQuoteModel
   */
  private async sendLeadInfoMail(quotePayload: IQuoteModel): Promise<any> {
    return await this.mailService
      .sendMail(quotePayload, constants.leader_info)
      .catch(error => {
        Logger.error('Error in sending Lead Info email', JSON.stringify(error));
      });
  }
}
