import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Item } from './interfaces/item.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
  const mockItemService = { findOne: jest.fn(), find: jest.fn() };

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

  describe('finOne', () => {
    it('should find return an item by id', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockItem);
      const result = await service.findOne(mockItem._id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockItem._id });
      expect(result).toEqual(mockItem);
    });

    //new test
    it('Should throw a BadRequestException if invalid id is provided', async () => {
      const id = 'invalid-id';
      const isValidObjectIdMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
      expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
      isValidObjectIdMock.mockRestore();
    });
    //new test
    it('should throw a NotFoundException if item id is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(mockItem._id)).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findOne).toHaveBeenCalledWith({ _id: mockItem._id });
    });
  });
});
