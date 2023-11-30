import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'Get all items';
  }
  @Post()
  create(): string {
    return 'Create item';
  }
}
