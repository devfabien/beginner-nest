import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

describe('ItemsController', () => {
  let itemController: ItemsController;
  let itemsService: ItemsService;

  const mockItem = {
    _id: '656859e9cd1b3375945adcaa',
    name: 'Item two',
    quantity: 28,
    __v: 0,
    description: 'this is item two',
  };
  const mockItemService = {
    findAll: jest.fn().mockResolvedValueOnce([mockItem]),
    create: jest.fn(),
    findOne: jest.fn().mockResolvedValueOnce(mockItem),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemService,
        },
      ],
    }).compile();

    itemController = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(itemController).toBeDefined();
  });

  describe('get all items', () => {
    it('should get all items', async () => {
      const result = await itemController.findAll();

      expect(itemsService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('create new item', () => {
    it('should create a new item', async () => {
      const newItem = {
        name: 'new item',
        description: 'new item description',
        quantity: 28,
      };

      itemsService.create = jest.fn().mockResolvedValueOnce(mockItem);
      const result = await itemController.create(newItem as CreateItemDto);

      expect(itemsService.create).toHaveBeenCalled();
      expect(result).toEqual(mockItem);
    });
  });
});
