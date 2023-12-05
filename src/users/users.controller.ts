import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  getUser(@Param('id') id: string): Promise<Users> {
    return this.userServices.findById(id);
  }
}
