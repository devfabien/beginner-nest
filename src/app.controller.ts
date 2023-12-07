import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('register')
  postRegister(): string {
    return this.appService.postRegister();
  }
}
