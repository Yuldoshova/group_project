import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
