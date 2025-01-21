import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromotionDto {
  @ApiProperty({
    description: 'The name of the promotion',
    example: 'Black Friday Sale',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the promotion',
    example: 'Big discounts on electronics during Black Friday!',
    required: false, // Optional maydon
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The image URL for the promotion',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'The discount date (when the discount starts)',
    example: '2025-01-25T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  discount_date: string;

  @ApiProperty({
    description: 'The start date of the promotion',
    example: '2025-01-20T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    description: 'The end date of the promotion',
    example: '2025-01-27T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
