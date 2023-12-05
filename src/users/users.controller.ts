import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  getAllUsers(): Promise<Users[]> {
    return this.userServices.findAll();
  }
}
