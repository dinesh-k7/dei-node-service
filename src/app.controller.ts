import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiTags('System')
  @ApiOperation({ summary: 'Check node application health' })
  getHealth(): number {
    return process.uptime();
  }
}
