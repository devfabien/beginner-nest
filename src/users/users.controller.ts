import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { CreateUseDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  getAllUsers(): Promise<Users[]> {
    return this.userServices.findAll();
  }

  @Post()
  createUser(@Body() user: CreateUseDto): Promise<Users> {
    return this.userServices.create(user);
  }
}
