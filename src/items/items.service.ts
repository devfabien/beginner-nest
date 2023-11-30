import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '123456',
      name: 'Item one',
      description: 'This is item one',
      quantity: 100,
    },
    {
      id: '268336',
      name: 'Item two',
      description: 'This is item two',
      quantity: 100,
    },
  ];
  findAll(): Item[] {
    return this.items;
  }
  findOne(id: string): Item {
    return this.items.find((item) => item.id === id);
  }
}
