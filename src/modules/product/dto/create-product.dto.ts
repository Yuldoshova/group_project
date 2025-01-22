import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'Name of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'This is a product description',
    description: 'Description of the product',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Image URL of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID the product belongs to',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: 'Brand ID of the product',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  brandId: number;
}
