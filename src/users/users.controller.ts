import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Param,
  ParseIntPipe,
  Get,
  Res,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

import { UsersService } from './users.service';
import { UserDto, UserLoginDto } from './dto/user-dto';
import { User } from './user.entity';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Function to create user based on the provided data
   * @param userPayload: User
   */
  @Post('register')
  @ApiOperation({ summary: 'Create user account' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  @ApiBody({ type: UserDto })
  public async createUser(@Body() userPayload: User): Promise<any> {
    return this.userService.createUser(userPayload);
  }

  /**
   * Function to get user by id
   * @param userId: number
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok', type: UserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any> {
    return this.userService.getUser(userId);
  }

  /**
   * Function to check email & password for users
   * @param loginPayload: any
   */
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Gateway error' })
  public async userLogin(
    @Body() loginPayload: UserLoginDto,
    @Res() response: Response,
  ): Promise<any> {
    this.userService.userLogin(loginPayload).then(
      loginSuccess => {
        if (loginSuccess && loginSuccess.length && loginSuccess.length === 1) {
          const [user] = loginSuccess;
          response.send({
            user_id: user.id,
            success: true,
            token: Math.floor(Math.random() * 999999999999 + 1111111),
          });
        } else {
          response.status(HttpStatus.UNAUTHORIZED).send({
            success: false,
          });
        }
      },
      () => {
        response.status(HttpStatus.UNAUTHORIZED).send({
          success: false,
        });
      },
    );
  }
}
