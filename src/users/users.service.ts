import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: Users): Promise<Users> {
    const response = await this.userModel.create(user);
    return response;
  }
}
