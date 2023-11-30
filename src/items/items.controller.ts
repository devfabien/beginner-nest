import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Item[] {
    return this.itemsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id): Item {
    return this.itemsService.findOne(id);
  }
  @Post()
  create(@Body() createItemDto: CreateItemDto): string {
    return `name: ${createItemDto.name} description: ${createItemDto.description} quantity: ${createItemDto.quantity}`;
  }
  @Delete(':id')
  delete(@Param('id') id): string {
    return `Delete ${id}`;
  }
  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
    return `update ${id} - name: ${updateItemDto.name}`;
  }
}
