import { PartialType } from '@nestjs/swagger';
import { CreatePromotionDto } from './createPromotion.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {
  @ApiPropertyOptional({
    example: 'Summer Sale',
    description: 'Name of the promotion',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'A limited-time summer sale on all items.',
    description: 'Description of the promotion',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL of the promotion image',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional({
    example: '2025-07-01T00:00:00Z',
    description: 'Discount date of the promotion (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  discount_date?: string;

  @ApiPropertyOptional({
    example: '2025-06-01T00:00:00Z',
    description: 'Start date of the promotion (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({
    example: '2025-06-30T23:59:59Z',
    description: 'End date of the promotion (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;
}
