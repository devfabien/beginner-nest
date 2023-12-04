import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';

describe('ItemsService', () => {
  let service: ItemsService;
  let model: Model<Item>;
  const mockItem = {
    _id: '656859e9cd1b3375945adcaa',
    name: 'Item two',
    quantity: 28,
    __v: 0,
    description: 'this is item two',
  };
  const mockItemService = { find: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getModelToken('Item'),
          useValue: mockItemService,
        },
      ],
    }).compile();
    service = module.get<ItemsService>(ItemsService);
    model = module.get<Model<Item>>(getModelToken('Item'));
  });

  describe('find', () => {
    it('Should return all items', async () => {
      jest.spyOn(model, 'find').mockResolvedValue([mockItem]);
      const output = await service.findAll();
      expect(output).toEqual([mockItem]);
    });
  });
});
