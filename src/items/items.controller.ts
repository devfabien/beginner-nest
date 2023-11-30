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

@Controller('items')
export class ItemsController {
  @Get()
  findAll(): string {
    return 'Get all items';
  }
  @Get(':id')
  findOne(@Param('id') id): string {
    return `Item ${id}`;
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
