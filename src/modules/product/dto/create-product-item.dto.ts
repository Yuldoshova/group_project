import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateProductItemDto {
  @ApiPropertyOptional({
    example: 'https://example.com/image.png',
    description: 'Image URL of the product item',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    example: 10,
    description: 'Amount of the product item',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 100.50,
    description: 'Price of the product item',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 1,
    description: 'Product ID the item belongs to',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'Color ID of the product item',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  colorId: number;
}

