import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Samsung Galaxy S21',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Latest model of Samsung Galaxy phone with high-end features',
    required: false, // Optional maydon
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The image URL of the product',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The category ID of the product',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    description: 'The brand ID of the product',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
