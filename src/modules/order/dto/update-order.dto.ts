import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsArray()
  @ApiProperty({
    type: () => [{ productId: Number, quantity: Number, price: Number }],
  })
  items: { productId: number; quantity: number; price: number }[];

  @IsNumber()
  @ApiProperty()
  totalPrice: number;
}
