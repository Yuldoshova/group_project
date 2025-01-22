import { PartialType } from '@nestjs/swagger';
import { CreateProductItemDto } from './create-product-item.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductItemDto extends PartialType(CreateProductItemDto) {
  @ApiPropertyOptional({
    example: 'https://example.com/updated-image.png',
    description: 'Updated image URL of the product item',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: 20,
    description: 'Updated amount of the product item',
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    example: 150.75,
    description: 'Updated price of the product item',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Updated product ID the item belongs to',
  })
  @IsOptional()
  @IsNumber()
  productId?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Updated color ID of the product item',
  })
  @IsOptional()
  @IsNumber()
  colorId?: number;
}
