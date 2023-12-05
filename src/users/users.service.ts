import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string): Promise<Users> {
    const response = await this.userModel.findById(id);
    if (!response) throw new NotFoundException('User not found');
    return response;
  }

  async findOne(userName: string): Promise<Users> {
    return await this.userModel.findOne({ userName: userName });
  }

  async updateById(id: string, user: Users): Promise<Users> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteById(id: string): Promise<Users> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
