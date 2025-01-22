import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
