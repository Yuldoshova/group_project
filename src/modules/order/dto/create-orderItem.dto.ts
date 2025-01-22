import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'User ID' })
  userId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Product Name' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Quantity' })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Price' })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Product ID' })
  productItem: number;
}
