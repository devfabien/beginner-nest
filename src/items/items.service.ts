import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  async findOne(id: string): Promise<Item> {
    const isValid = mongoose.isValidObjectId(id);
    if (!isValid) throw new BadRequestException('Please enter correct id');
    const response = await this.itemModel.findOne({ _id: id });
    if (!response) throw new NotFoundException();
    return response;
  }
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item> {
    const response = await this.itemModel.findByIdAndDelete(id);
    if (!response) throw new NotFoundException();
    return response;
  }
  async update(id: string, item: Item): Promise<Item> {
    try {
      return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    } catch {
      throw new NotFoundException();
    }
  }
}
