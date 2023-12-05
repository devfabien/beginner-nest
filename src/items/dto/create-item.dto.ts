import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MinLength(8)
  readonly name: string;
  readonly description: string;
  readonly quantity: number;
}
