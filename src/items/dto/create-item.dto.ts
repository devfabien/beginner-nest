import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MinLength(8)
  name: string;
  description: string;
  quantity: number;
}
