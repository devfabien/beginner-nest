import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';
// import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndDelete(id);
  }
  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
