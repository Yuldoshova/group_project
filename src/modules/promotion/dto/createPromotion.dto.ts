import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsDateString,
} from 'class-validator';

export class CreatePromotionDto {
  @ApiProperty({
    example: 'Summer Sale',
    description: 'Name of the promotion',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'A limited-time summer sale on all items.',
    description: 'Description of the promotion',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the promotion image',
    required: true,
  })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: '2025-07-01T00:00:00Z',
    description: 'Discount date of the promotion (ISO format)',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  discount_date: string;

  @ApiProperty({
    example: '2025-06-01T00:00:00Z',
    description: 'Start date of the promotion (ISO format)',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({
    example: '2025-06-30T23:59:59Z',
    description: 'End date of the promotion (ISO format)',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}

